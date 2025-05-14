
import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js';
import { expect } from 'chai';
import { Escrow } from '../target/types/escrow';

describe('betezen', () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.betezen as Program<Escrow>;
    const buyer = Keypair.generate();
    const trader = Keypair.generate();

    before(async () => {
        // Airdrop SOL to buyer for testing
        const signature = await provider.connection.requestAirdrop(
            buyer.publicKey,
            2 * LAMPORTS_PER_SOL
        );
        await provider.connection.confirmTransaction(signature);
    });

    it('Opens a position', async () => {
        const [escrowAccount] = PublicKey.findProgramAddressSync(
            [Buffer.from('escrow'), buyer.publicKey.toBuffer()],
            program.programId
        );

        await program.methods
            .openPosition(
                'USA',
                { long: {} },
                2,
                new anchor.BN(1_000_000)
            )
            .accounts({
                escrow_account: escrowAccount,
                buyer: buyer.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .signers([buyer])
            .rpc();

        const account = await program.account.escrowAccount.fetch(escrowAccount);
        expect(account.countryId).to.equal('USA');
        expect(account.leverage).to.equal(2);
        expect(account.size.toString()).to.equal('1000000');
        expect(account.isOpen).to.equal(true);
    });

    it('Closes a position', async () => {
        const [escrowAccount] = PublicKey.findProgramAddressSync(
            [Buffer.from('escrow'), buyer.publicKey.toBuffer()],
            program.programId
        );

        await program.methods
            .closePosition()
            .accounts({
                escrowAccount,
                trader: buyer.publicKey,
            })
            .signers([buyer])
            .rpc();

        const account = await program.account.escrowAccount.fetch(escrowAccount);
        expect(account.isOpen).to.equal(false);
    });

    it('Sets take profit and stop loss', async () => {
        const [escrowAccount] = PublicKey.findProgramAddressSync(
            [Buffer.from('escrow'), buyer.publicKey.toBuffer()],
            program.programId
        );

        // First open a new position
        await program.methods
            .openPosition(
                'EUR',
                { long: {} },
                3,
                new anchor.BN(2_000_000)
            )
            .accounts({
                escrowAccount: escrowAccount,
                buyer: buyer.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .signers([buyer])
            .rpc();

        // Set TP/SL
        await program.methods
            .setTpsl(
                new anchor.BN(150),  // Take profit price
                new anchor.BN(90)    // Stop loss price
            )
            .accounts({
                escrowAccount,
                trader: buyer.publicKey,
            })
            .signers([buyer])
            .rpc();

        const account = await program.account.escrowAccount.fetch(escrowAccount);
        expect(account.takeProfit.toString()).to.equal('150');
        expect(account.stopLoss.toString()).to.equal('90');
    });

    it('Fails to open position with invalid leverage', async () => {
        const [escrowAccount] = PublicKey.findProgramAddressSync(
            [Buffer.from('escrow'), trader.publicKey.toBuffer()],
            program.programId
        );

        try {
            await program.methods
                .openPosition(
                    'GBP',
                    { long: {} },
                    6, // Invalid leverage (>5)
                    new anchor.BN(1_000_000)
                )
                .accounts({
                    escrowAccount: escrowAccount,
                    buyer: trader.publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .signers([trader])
                .rpc();
            expect.fail('Should have failed with invalid leverage');
        } catch (error) {
            if (error instanceof Error) {
                expect(error.toString()).to.include('InvalidLeverage');
            } else {
                expect.fail('Caught error is not an instance of Error');
            }
        }
    });

    it('Fails to close position with wrong trader', async () => {
        const [escrowAccount] = PublicKey.findProgramAddressSync(
            [Buffer.from('escrow'), buyer.publicKey.toBuffer()],
            program.programId
        );

        try {
            await program.methods
                .closePosition()
                .accounts({
                    escrowAccount,
                    trader: trader.publicKey, // Wrong trader
                })
                .signers([trader])
                .rpc();
            expect.fail('Should have failed with unauthorized access');
        } catch (error) {
            if (error instanceof Error) {
                expect(error.toString()).to.include('Unauthorized');
            } else {
                expect.fail('Caught error is not an instance of Error');
            }
        }
    });
});
