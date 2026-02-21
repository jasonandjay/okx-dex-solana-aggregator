---
name: okx_dex_aggregator
description: Powerful Crypto Trading & Analytics Engine. Provides specialized tools for Solana (chainId:501) including smart routing quote engine, atomic swap execution with local signing, real-time token market prices, and comprehensive token metadata info.
metadata: { "openclaw": { "emoji": "🦞", "requires": { "env": ["OKX_DEX_API_KEY", "OKX_DEX_SECRET_KEY", "OKX_DEX_PASSPHRASE", "SOLANA_PRIVATE_KEY"] } } }
---

# OKX DEX Aggregator & Market Skill

A professional-grade crypto toolkit for AI agents to perform trading and market analysis on Solana and other blockchain networks.

## Core Capabilities

### 1. Smart Route Quote Engine
Access institutional-grade liquidity via OKX DEX Aggregator. Finds the most efficient routes to minimize slippage and maximize output.

### 2. Atomic Swap Execution
End-to-end on-chain token exchanges with local signing of Solana VersionedTransactions (V0). Private keys never leave the host environment.

### 3. Market Intelligence
Real-time access to token prices, supply data, and metadata for informed trading decisions.

## Tools

### `get_dex_quote`
Consult for price quotes, currency conversion, or swap estimates.
- `from_token`: Source asset mint address.
- `to_token`: Target asset mint address.
- `amount`: Quantity in minimal units (e.g., lamports).
- `slippage`: Max acceptable price variance (default 0.03).

### `execute_dex_swap`
Commands immediate execution of a signed on-chain trade.
- `from_token`, `to_token`, `amount`, `slippage`: As above.

### `get_token_info`
Fetches token metadata (symbol, name, supply, decimals). Use this to verify tokens or get background info.
- `token_address`: Mint address of the token.
- `chain_index`: (Default: '501') Blockchain index.

### `get_token_price`
Fetches the current market price of a token in USDC/USD. Use this for balance checks or market monitoring.
- `token_address`: Mint address of the token.
- `chain_index`: (Default: '501') Blockchain index.

## Implementation Details
- **Unified Entry**: Agent executes logic via `./dist/tools.js`. 
- **Standalone**: All dependencies included. No `npm install` required.
