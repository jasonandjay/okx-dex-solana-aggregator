# OKX DEX Aggregator Skill

A collection of tools to interact with OKX DEX Aggregator for high-efficiency multi-chain swaps, specifically optimized for Solana (ChainIndex: 501).

## Capabilities
- **Quote Engine**: Fetch real-time quotes with optimized routing across multiple liquidity sources (DEXs).
- **Transaction Builder**: Construct ready-to-sign swap data for designated wallets.
- **Solana Specialist**: Local signing support for Solana `VersionedTransactions` (V0).

## Tools

### `get_dex_quote`
Fetches the best swap route and estimated output.
- `chainIndex`: (Default: '501') Target network index.
- `fromTokenAddress`: Mint address of the source token.
- `toTokenAddress`: Mint address of the target token.
- `amount`: Raw amount (in minimal denomination, e.g., lamports for SOL).
- `slippagePercent`: e.g., '0.01' for 1%.

### `execute_dex_swap`
Builds, signs, and broadcasts a swap transaction on-chain.
- `chainIndex`: Target network index.
- `fromTokenAddress`: Mint address of the source token.
- `toTokenAddress`: Mint address of the target token.
- `amount`: Raw amount.
- `slippagePercent`: Maximum allowed slippage.

## Configuration
- **API Credentials**: Secured within the local client module.
- **Private Key**: Loaded via `SOLANA_PRIVATE_KEY` for secure local signing.
- **Provider**: OKX Web3 Infrastructure.

## Usage Guidelines
- Always confirm price impact via `get_dex_quote` before large swaps.
- For Solana, the skill automatically handles transaction serialization and broadcasting.
