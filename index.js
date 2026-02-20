const axios = require('axios');
const crypto = require('crypto');
const web3 = require('@solana/web3.js');
const bs58Raw = require('bs58');
const bs58 = bs58Raw.default || bs58Raw;

class OKXDEXClient {
    constructor() {
        this.apiKey = process.env.OKX_DEX_API_KEY;
        this.secretKey = process.env.OKX_DEX_SECRET_KEY;
        this.passphrase = process.env.OKX_DEX_PASSPHRASE;
        this.baseUrl = 'https://web3.okx.com';
        this.solanaPrivateKey = process.env.SOLANA_PRIVATE_KEY;
    }

    getTimestamp() {
        return new Date().toISOString();
    }

    async genSignature(timestamp, method, requestPath, body = '') {
        const message = timestamp + method.toUpperCase() + requestPath + body;
        return crypto
            .createHmac('sha256', this.secretKey)
            .update(message)
            .digest('base64');
    }

    async request(method, path, params = null, data = null) {
        let fullPath = path;
        if (params && Object.keys(params).length > 0) {
            const sortedKeys = Object.keys(params).sort();
            const queryString = sortedKeys.map(k => `${k}=${params[k]}`).join('&');
            fullPath += `?${queryString}`;
        }

        const timestamp = this.getTimestamp();
        const bodyStr = data ? JSON.stringify(data) : '';
        const signature = await this.genSignature(timestamp, method, fullPath, bodyStr);

        const config = {
            method: method,
            url: this.baseUrl + fullPath,
            headers: {
                'OK-ACCESS-KEY': this.apiKey,
                'OK-ACCESS-SIGN': signature,
                'OK-ACCESS-TIMESTAMP': timestamp,
                'OK-ACCESS-PASSPHRASE': this.passphrase,
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: error.message };
        }
    }

    async getQuote(chainIndex, fromTokenAddress, toTokenAddress, amount, slippagePercent = '0.03') {
        return await this.request('GET', '/api/v6/dex/aggregator/quote', {
            amount, chainIndex, fromTokenAddress, slippagePercent, toTokenAddress
        });
    }

    async executeSwap(chainIndex, fromTokenAddress, toTokenAddress, amount, slippagePercent) {
        if (!this.solanaPrivateKey) throw new Error('SOLANA_PRIVATE_KEY not set');
        const keypair = web3.Keypair.fromSecretKey(bs58.decode(this.solanaPrivateKey));
        const userAddress = keypair.publicKey.toString();

        const res = await this.request('GET', '/api/v6/dex/aggregator/swap', {
            amount, chainIndex, fromTokenAddress, slippagePercent, toTokenAddress, userWalletAddress: userAddress
        });
        
        if (res.code === '0') {
            const txData = res.data[0].tx.data;
            const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'), 'confirmed');
            
            // 处理 Solana 交易解析 (处理 bs58 格式的数据)
            const txBuffer = bs58.decode(txData);
            const transaction = web3.VersionedTransaction.deserialize(txBuffer);
            transaction.sign([keypair]);
            
            const sig = await connection.sendRawTransaction(transaction.serialize());
            return { success: true, signature: sig };
        }
        return { success: false, error: res.msg || 'Swap data fetch failed' };
    }
}
module.exports = OKXDEXClient;
