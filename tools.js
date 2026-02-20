const OKXDEXClient = require('./index');

/**
 * OpenClaw Skill Wrapper
 * This file maps the internal logic to OpenClaw's tool execution environment.
 */

const client = new OKXDEXClient();

async function get_dex_quote(args) {
    const { from_token, to_token, amount, slippage = '0.03' } = args;
    const res = await client.getQuote('501', from_token, to_token, amount, slippage);
    if (res.code === '0') {
        const data = res.data[0];
        return {
            success: true,
            output_amount: data.toTokenAmount,
            price_impact: data.priceImpactPercent + '%',
            fee: data.estimateGasFee,
            route: data.router
        };
    }
    return { success: false, error: res.msg };
}

async function execute_dex_swap(args) {
    const { from_token, to_token, amount, slippage = '0.03' } = args;
    console.log(`[Skill] Executing Solana swap: ${amount} units from ${from_token} to ${to_token}`);
    const res = await client.executeSwap('501', from_token, to_token, amount, slippage);
    return res;
}

// OpenClaw tool map
module.exports = {
    get_dex_quote,
    execute_dex_swap
};
