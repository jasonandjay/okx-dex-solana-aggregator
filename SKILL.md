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

## Implementation Details for Agents
- **Execution Entry**: All tools must be executed via the bundled file located at `dist/tools.js`. 
- **Zero-Dependency**: This skill does NOT require `npm install`. The agent should directly `require('./dist/tools.js')` or execute tasks through the bundled logic.
- **Environment**: Ensure OKX API keys and `SOLANA_PRIVATE_KEY` are present in the environment for signed transactions. 
