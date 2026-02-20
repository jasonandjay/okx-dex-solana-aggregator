const OKXClient = require('./index');
const client = new OKXClient();

async function get_dex_quote(args) {
    const { from_token, to_token, amount, slippage = '0.03' } = args;
    const res = await client.getQuote('501', from_token, to_token, amount, slippage);
    if (res.code === '0') {
        const data = res.data[0];
        return { success: true, output_amount: data.toTokenAmount, price_impact: data.priceImpactPercent + '%', route: data.router };
    }
    return { success: false, error: res.msg || 'Quote failed' };
}

async function execute_dex_swap(args) {
    const { from_token, to_token, amount, slippage = '0.03' } = args;
    return await client.executeSwap('501', from_token, to_token, amount, slippage);
}

module.exports = { get_dex_quote, execute_dex_swap };
