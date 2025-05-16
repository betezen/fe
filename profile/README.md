# Betezen.Fun
**Perpetual Prediction Market for Country Performance**  
*Don't Bet, Trade Your Country's Future.*

---

<img src="assets/betezen.png" alt="Betezen Logo" width="400"/>

## 🧭 Overview
Betezen.Fun introduces a new type of prediction market: **perpetual, decentralized, and based on economic fundamentals**.
Users can trade tokenized representations of country performance — going long or short — based on indicators like inflation, GDP growth, stock indices, and exchange rates.
These contracts never expire, allowing positions to be held as long as desired.

Unlike traditional prediction markets where users bet on binary outcomes, 
Betezen.Fun quantifies macroeconomic predictions into tradable indices. 
For example, instead of predicting "Will interest rates rise?", traders can go 
long or short on a rate index that reflects central bank decisions. This turns 
policy speculation into an on-chain asset.

## 😵 Problem We Are Solving
- ⏳ Expiring prediction markets limit long-term forecasting.
- 💸 High liquidation risk on leveraged positions.
- 🧩 No financial product for directly trading macro trends of countries.
- 🌐 Prediction markets too focused on events, not economic fundamentals.

## 💡 Solution
We introduce Perpetual Country Positions, where traders can:
- 📈 Open long/short positions on countries based on real indicators.
- 🌀 Keep positions perpetually — no expiry.
- ⚖️ Avoid full liquidations — positions decay over time, not explode.
- 🤝 Trade with transparent funding fees and no centralized intermediaries.

## ⚙️ How It Works
1. CountryScore Calculation
   Based on CPI, GDP, Stock Index, Exchange Rate via oracle.
2. Position Contracts
   Users open long or short using openPosition(), and can set takeProfit/stopLoss.
3. Funding Fee Model
   Balances incentives between longs/shorts.
4. Profit/Loss Sharing
   All handled by smart contracts — no need to trust us.

## ✨ Key Features
- 🔁 Perpetual Markets – Positions never expire.
- 📊 CountryScore – Derived from economic data.
- 🧠 Leverage Trading – Predict with 1x–5x impact.
- 🤖 On-Chain Settlement – All logic in Solana(SVM).
- 🧑‍🌾 Liquidity Provider Rewards – For market makers.
- 🔄 No Total Liquidation – Reduce risk, improve fairness.

## 🧪 Tech Stack
| Layer          | Stack / Tools                                           |
| -------------- | ------------------------------------------------------- |
| Frontend       | **Next.js, Tailwind CSS**                              |
| Wallet Auth    | **Connect with Phantom Wallet**                         |
| Smart Contract | **Rust via Solana Program Library (SPL)**               |
| Blockchain     | **Solana**                                              |
| Dev Tools      | **Anchor Framework, Solana CLI**                        |
| Hosting        | **Netlify**                                             |

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have installed the following versions:

- **Node.js** `v18.18.0` or higher  
- **Rust** `v1.77.2` or higher  
- **Anchor CLI** `v0.31.1` or higher  
- **Solana CLI** `v1.18.17` or higher  

### 📦 Installation

1. **Clone repository:**
```bash
git clone https://github.com/betezen/fe.git
cd fe
```

2. **Install packages:**
```bash
npm install
```

3. **Run the application:**
```bash
npm run dev
```

### Version Information
```
avm --version            
avm 0.31.1

anchor --version         
anchor-cli 0.31.1

rustup --version     
rustup 1.28.2 (e4f3ad6f8 2025-04-28)
info: This is the version for the rustup toolchain manager, not the rustc compiler.
info: The currently active `rustc` version is `rustc 1.86.0 (05f9846f8 2025-03-31)`

rustc --version 
rustc 1.86.0 (05f9846f8 2025-03-31)
```

## ⚙️ Smart Contracts on Solana
Our smart contracts are built using Rust and the Solana Program Library (SPL), leveraging Solana's high-performance architecture. This enables:

⚡ Why Solana
- Low Transaction Fees
  Solana's efficient architecture allows for extremely low transaction costs, making it ideal for frequent trading and market operations.
  
- High Performance
  With its parallel transaction processing and high throughput, Solana can handle thousands of transactions per second, perfect for a dynamic prediction market platform.

### Anchor Setup
To setup Anchor with Rust, add Anchor.toml and Cargo.toml files to your project.

## 📚 References & Inspirations
**Noise.xyz:**
- Inspired the idea of tokenizing non-price signals like attention.
- **🔗Link : [noise.xyz](https://www.noise.xyz/)** 

**Polymarket:**
- Demonstrated strong UX in decentralized betting.
- **🔗Link : [polymarket.com](https://polymarket.com/)** 

## 🛠 How to Contribute
```bash
# 1. Fork this repo
# 2. Create a new branch
git checkout -b feature/your-feature

# 3. Make your changes
# 4. Push and open a PR
git push origin feature/your-feature
```

## Team
<table align="center">
  <tr>
    <td align="center">
      <img src="assets/Ahmad taufiq.png" width="100" style="border-radius:50%"/><br>
      <b><a href="https://github.com/AhmadTaufiq24">Ahmad Taufiq Harahap</a></b><br>
      <sub>Project Manager</sub><br>
    </td>
    <td align="center">
      <img src="assets/Syahlevi.png" width="100" style="border-radius:50%"/><br>
      <b><a href="https://github.com/syahlevi-aldarna">Syahlevi Aldarna</a></b><br>
      <sub>Frontend Dev</sub><br>
    </td>
    <td align="center">
      <img src="assets/Danuardi.png" width="100" style="border-radius:50%"/><br>
      <b> <a href="https://github.com/Danuardi">Danuardi Wahyu</a></b><br>
      <sub>Backend Dev</sub><br>
    </td>
  </tr>
</table>

## Contact
<p align="left">
<a href="mailto:betezen.fun@gmail.com" style="text-decoration:none" target="blank">
<img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>
</a>
<a href="https://x.com/betezen_fun" style="text-decoration:none" target="blank">
<img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="X"/>
</a>
</p>
