#![allow(clippy::result_large_err)]
#![allow(unexpected_cfgs)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let state = &mut ctx.accounts.program_state;
        let authority = &ctx.accounts.authority;

        // Initialize program state
        state.authority = authority.key();
        state.total_positions = 0;
        state.is_initialized = true;
        state.creation_time = Clock::get()?.unix_timestamp;

        // Emit event for initialization
        emit!(ProgramInitialized {
            authority: authority.key(),
            timestamp: state.creation_time,
        });

        Ok(())
    }

    pub fn open_position(
        ctx: Context<OpenPosition>,
        country_id: String,
        direction: PositionDirection,
        leverage: u8,
        size: u64,
    ) -> Result<()> {
        // Validate inputs
        require!(size > 0, EscrowError::ZeroAmount);
        require!(leverage >= 1 && leverage <= 5, EscrowError::InvalidLeverage);

        let escrow_account = &mut ctx.accounts.escrow_account;
        let buyer = &ctx.accounts.buyer;

        // Calculate fees
        let fee = (size * TRANSACTION_FEE) / 10000;
        let position_size = size.checked_sub(fee).ok_or(EscrowError::InternalError)?;

        // Initialize position
        escrow_account.position_id = 0; // You would implement a counter
        escrow_account.country_id = country_id;
        escrow_account.trader = *buyer.key;
        escrow_account.direction = direction.clone();
        escrow_account.size = position_size;
        escrow_account.leverage = leverage;
        escrow_account.entry_price = 100; // Mock price
        escrow_account.open_time = Clock::get()?.unix_timestamp;
        escrow_account.take_profit = 0;
        escrow_account.stop_loss = 0;
        escrow_account.is_open = true;
        escrow_account.liquidation_price =
            calculate_liquidation(escrow_account.entry_price, leverage, direction)?;

        Ok(())
    }

    pub fn close_position(ctx: Context<ClosePosition>) -> Result<()> {
        let escrow_account = &mut ctx.accounts.escrow_account;
        let trader = &ctx.accounts.trader;

        require!(escrow_account.is_open, EscrowError::PositionClosed);
        require!(
            escrow_account.trader == *trader.key,
            EscrowError::Unauthorized
        );

        let current_price = 120; // Mock price - would come from oracle

        let pnl = calculate_pnl(
            escrow_account.direction.clone(),
            escrow_account.entry_price,
            current_price,
            escrow_account.size,
            escrow_account.leverage,
        )?;

        // Transfer funds back to trader
        let amount = if pnl >= 0 {
            escrow_account
                .size
                .checked_add(pnl as u64)
                .ok_or(EscrowError::InternalError)?
        } else {
            escrow_account
                .size
                .checked_sub((-pnl) as u64)
                .ok_or(EscrowError::InternalError)?
        };

        escrow_account.is_open = false;

        // Transfer lamports implementation would go here
        transfer_lamports(
            &ctx.accounts.escrow_account.to_account_info(),
            &trader.to_account_info(),
            amount,
        )?;

        Ok(())
    }

    pub fn set_tpsl(ctx: Context<SetTPSL>, take_profit: u64, stop_loss: u64) -> Result<()> {
        let escrow_account = &mut ctx.accounts.escrow_account;

        require!(escrow_account.is_open, EscrowError::PositionClosed);

        escrow_account.take_profit = take_profit;
        escrow_account.stop_loss = stop_loss;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 8 + 1 + 8, // Adjust space according to ProgramState struct
        seeds = [b"program_state"],
        bump
    )]
    pub program_state: Account<'info, ProgramState>,
    pub system_program: Program<'info, System>,
}

#[event]
pub struct ProgramInitialized {
    pub authority: Pubkey,
    pub timestamp: i64,
}

#[account]
pub struct ProgramState {
    pub authority: Pubkey,
    pub total_positions: u64,
    pub is_initialized: bool,
    pub creation_time: i64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, InitSpace)]
pub enum PositionDirection {
    Long,
    Short,
}

#[account]
#[derive(InitSpace)]
pub struct EscrowAccount {
    pub position_id: u64,
    #[max_len(32)]
    pub country_id: String,
    pub trader: Pubkey,
    pub direction: PositionDirection,
    pub size: u64,
    pub leverage: u8,
    pub entry_price: u64,
    pub open_time: i64,
    pub take_profit: u64,
    pub stop_loss: u64,
    pub is_open: bool,
    pub liquidation_price: u64,
}

const TRANSACTION_FEE: u64 = 30;
const MAINTENANCE_MARGIN: u64 = 10;

fn calculate_liquidation(
    entry_price: u64,
    leverage: u8,
    direction: PositionDirection,
) -> Result<u64> {
    let leverage = leverage as u64;

    let liquidation_price = match direction {
        PositionDirection::Long => entry_price
            .checked_mul(leverage)
            .and_then(|v| v.checked_div(leverage + 1))
            .and_then(|v| v.checked_sub(leverage.checked_mul(MAINTENANCE_MARGIN)?)),
        PositionDirection::Short => entry_price
            .checked_mul(leverage)
            .and_then(|v| v.checked_div(leverage - 1))
            .and_then(|v| v.checked_sub(leverage.checked_mul(MAINTENANCE_MARGIN)?)),
    }
    .ok_or(EscrowError::InternalError)?;

    Ok(liquidation_price)
}

fn calculate_pnl(
    direction: PositionDirection,
    entry_price: u64,
    current_price: u64,
    size: u64,
    leverage: u8,
) -> Result<i64> {
    let leverage = leverage as u64;

    let pnl = match direction {
        PositionDirection::Long => {
            if current_price > entry_price {
                (current_price - entry_price)
                    .checked_mul(size)
                    .and_then(|v| v.checked_mul(leverage))
                    .and_then(|v| v.checked_div(entry_price))
                    .map(|v| v as i64)
            } else {
                (entry_price - current_price)
                    .checked_mul(size)
                    .and_then(|v| v.checked_mul(leverage))
                    .and_then(|v| v.checked_div(entry_price))
                    .map(|v| -(v as i64))
            }
        }
        PositionDirection::Short => {
            if current_price > entry_price {
                (current_price - entry_price)
                    .checked_mul(size)
                    .and_then(|v| v.checked_mul(leverage))
                    .and_then(|v| v.checked_div(entry_price))
                    .map(|v| -(v as i64))
            } else {
                (entry_price - current_price)
                    .checked_mul(size)
                    .and_then(|v| v.checked_mul(leverage))
                    .and_then(|v| v.checked_div(entry_price))
                    .map(|v| v as i64)
            }
        }
    }
    .ok_or(EscrowError::InternalError)?;

    Ok(pnl)
}

#[derive(Accounts)]
#[instruction(country_id: String, direction: PositionDirection, leverage: u8, size: u64)]
pub struct OpenPosition<'info> {
    #[account(
        init,
        payer = buyer,
        space = EscrowAccount::INIT_SPACE,
        seeds = [b"escrow", buyer.key().as_ref()],
        bump
    )]
    pub escrow_account: Account<'info, EscrowAccount>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClosePosition<'info> {
    #[account(mut)]
    pub escrow_account: Account<'info, EscrowAccount>,
    #[account(mut)]
    pub trader: Signer<'info>,
}

#[derive(Accounts)]
pub struct SetTPSL<'info> {
    #[account(mut)]
    pub escrow_account: Account<'info, EscrowAccount>,
    pub trader: Signer<'info>,
}

fn transfer_lamports(from: &AccountInfo, to: &AccountInfo, amount: u64) -> Result<()> {
    **from.try_borrow_mut_lamports()? = from
        .lamports()
        .checked_sub(amount)
        .ok_or(EscrowError::InternalError)?;
    **to.try_borrow_mut_lamports()? = to
        .lamports()
        .checked_add(amount)
        .ok_or(EscrowError::InternalError)?;
    Ok(())
}

#[error_code]
pub enum EscrowError {
    #[msg("Amount must be greater than zero")]
    ZeroAmount,
    #[msg("Leverage must be between 1 and 5")]
    InvalidLeverage,
    #[msg("Position is already closed")]
    PositionClosed,
    #[msg("Unauthorized access")]
    Unauthorized,
    #[msg("Internal calculation error")]
    InternalError,
}
