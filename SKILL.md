---
name: okx_dex_aggregator
description: Powerful Crypto Trading Engine for Quote & Swap on Solana (chainId:501). Orchestrates OKX Web3 API to find the best routes and execute instant atomic trades with complex routing.
metadata: { "openclaw": { "emoji": "🦞", "requires": { "env": ["OKX_DEX_API_KEY", "OKX_DEX_SECRET_KEY", "OKX_DEX_PASSPHRASE", "SOLANA_PRIVATE_KEY"] } } }
---

# OKX DEX Aggregator Skill

A specialized AI agent skill designed for professional crypto trading operations. This skill enables the agent to act as a high-frequency trading desk for Solana (501) and other supported networks.

## Core Capabilities

### 1. Smart Route Quote Engine
Access institutional-grade liquidity and pricing via the OKX Dex Aggregator. It finds the most efficient routes across multiple DEXs (Raydium, Orca, Meteora, etc.) to minimize slippage and maximize output.

### 2. Atomic Swap Execution
Execute end-to-end on-chain token exchanges. The engine handles:
- Fetching specific `swapData` for your unique wallet address.
- Local signing of Solana `VersionedTransactions (V0)`.
- Direct on-chain broadcasting and receipt verification.

## Integrated Tools

### `get_dex_quote`
Consult this tool whenever a price check, currency conversion, or swap estimate is needed. 
- `from_token`: Source asset mint address.
- `to_token`: Target asset mint address.
- `amount`: Quantity in minimal units (e.g., lamports).
- `slippage`: Maximum acceptable price variance (default 0.03).

### `execute_dex_swap`
Commands the immediate execution of a trade. 
- `from_token`: Token to spend.
- `to_token`: Token to receive.
- `amount`: Spend amount.
- `slippage`: Slippage tolerance.

## Implementation Details
- **Unified Entry**: Agent executes logic via `./dist/tools.js`. 
- **Security**: Local signing using `SOLANA_PRIVATE_KEY` ensures private keys never leave the host environment.
- **Protocol**: Leverages OKX Web3 V6 infrastructure for maximum reliability.
