# OKX DEX Aggregator Skill

A high-performance, zero-dependency trading skill for Solana.

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

## Implementation Details
- **Zero-Dependency**: This skill does NOT require `npm install`. It is pre-bundled into a single executable logic.
- **Agent Entry**: Tools MUST be executed by requiring the standalone bundle at `./dist/tools.js`.
- **Requirements**: Ensure `OKX_DEX_API_KEY`, `OKX_DEX_SECRET_KEY`, `OKX_DEX_PASSPHRASE`, and `SOLANA_PRIVATE_KEY` are configured in the environment.
