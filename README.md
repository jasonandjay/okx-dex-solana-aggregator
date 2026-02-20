# OKX DEX Aggregator Skill (Zero-Dependency)

A high-performance trading skill collection for Solana trading via OKX DEX Aggregator, designed for seamless OpenClaw integration.

## Description
This skill enables automated quoting and trading on Solana. It is pre-bundled to work out-of-the-box without requiring any local `npm install`.

## Entry Points
- **Core Library**: `dist/index.js`
- **OpenClaw Tools**: `dist/tools.js`

## Configuration
Set the following environment variables in your system or OpenClaw Gateway:
- `OKX_DEX_API_KEY`: Your OKX API Key
- `OKX_DEX_SECRET_KEY`: Your OKX API Secret
- `OKX_DEX_PASSPHRASE`: Your OKX API Passphrase
- `SOLANA_PRIVATE_KEY`: Your Solana Wallet Private Key (Base58)

## Features
- **Instant Quotes**: Real-time routing via `get_dex_quote`.
- **Atomic Swaps**: One-click execution via `execute_dex_swap`.
- **Bundled Execution**: All dependencies (including `@solana/web3.js`) are included in the `dist/` files.

## Usage for Agents
Agents should prioritize calling the bundled tools in `dist/tools.js` for zero-setup execution.

## Disclaimer
This software is for educational purposes. digital asset trading involves significant risk.
