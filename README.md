# OKX DEX Aggregator Skill

A collection of Node.js tools specifically optimized for Solana trading via OKX DEX Aggregator.

## Description
This project enables automated trading on Solana by leveraging the OKX DEX Aggregator API. It handles price quoting, transaction building, and local signing for Solana transactions.

## Installation
```bash
npm install
```

## Environment Variables
Ensure the following variables are set in your environment:
- `OKX_DEX_API_KEY`: Your OKX API Key
- `OKX_DEX_SECRET_KEY`: Your OKX API Secret
- `OKX_DEX_PASSPHRASE`: Your OKX API Passphrase
- `SOLANA_PRIVATE_KEY`: Your Solana Wallet Private Key (Base58 format)

## Project Structure
- `index.js`: Core client with OKX API and Solana signing logic.
- `tools.js`: OpenClaw skill wrapper for seamless agent integration.
- `package.json`: Dependency definitions.

## Disclaimer
This software is for educational purposes only. Use it at your own risk. Trading digital assets involves significant risk.
