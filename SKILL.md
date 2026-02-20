# OKX DEX Aggregator Skill

A high-performance trading skill for Solana.

## Tools

### `get_dex_quote`
Retrieves the best routing and price for a token swap.
- `from_token`: String. Source token mint address (e.g., SOL: `11111111111111111111111111111111`).
- `to_token`: String. Target token mint address.
- `amount`: String. Amount in raw units (lamports for SOL).
- `slippage`: String. Optional. Default "0.03".

### `execute_dex_swap`
Executes a swap on-chain after local signing.
- `from_token`: String. Source token mint address.
- `to_token`: String. Target token mint address.
- `amount`: String. Amount in raw units.
- `slippage`: String. Optional. Default "0.03".

## Implementation
The tools are powered by self-contained bundles in the `dist/` directory, requiring no external `npm install` to run within OpenClaw.
