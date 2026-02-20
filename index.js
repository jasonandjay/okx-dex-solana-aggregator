const axios = require('axios');
const crypto = require('crypto');
const web3 = require('@solana/web3.js');
const bs58 = require('bs58');

/**
 * OKXDEXClient
 * Required environment variables:
 * - OKX_DEX_API_KEY
 * - OKX_DEX_SECRET_KEY
 * - OKX_DEX_PASSPHRASE
 * - SOLANA_PRIVATE_KEY
 */
class OKXDEXClient {
    constructor() {
        this.apiKey = process.env.OKX_DEX_API_KEY;
        this.secretKey = process.env.OKX_DEX_SECRET_KEY;
        this.passphrase = process.env.OKX_DEX_PASSPHRASE;
        this.baseUrl = 'https://www.okx.com';
        this.solanaPrivateKey = process.env.SOLANA_PRIVATE_KEY;

        if (!this.apiKey || !this.secretKey || !this.passphrase) {
            throw new Error('Missing OKX API credentials in environment variables.');
        }
    }

    getTimestamp() {
        return new Date().toISOString();
    }

    async genSignature(timestamp, method, requestPath, body = '') {
        method = method.toUpperCase();
        const message = timestamp + method + requestPath + body;
        return crypto
            .createHmac('sha256', this.secretKey)
            .update(message)
            .digest('base64');
    }

    async request(method, path, params = null, data = null) {
        let fullPath = path;
        if (params && Object.keys(params).length > 0) {
            const queryString = Object.keys(params).sort().map(key => `${key}=${params[key]}`).join('&');
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
            },
            data: data
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            return error.response ? error.response.data : { error: error.message };
        }
    }

    async getQuote(chainIndex, fromTokenAddress, toTokenAddress, amount, slippagePercent = '0.03') {
        const path = '/api/v6/dex/aggregator/quote';
        return await this.request('GET', path, {
            amount,
            chainIndex,
            fromTokenAddress,
            slippagePercent,
            toTokenAddress
        });
    }

    async getSwapData(chainIndex, fromTokenAddress, toTokenAddress, amount, slippagePercent, userWalletAddress) {
        const path = '/api/v6/dex/aggregator/swap';
        return await this.request('GET', path, {
            amount,
            chainIndex,
            fromTokenAddress,
            slippagePercent,
            toTokenAddress,
            userWalletAddress
        });
    }

    async executeSwap(chainIndex, fromTokenAddress, toTokenAddress, amount, slippagePercent) {
        if (!this.solanaPrivateKey) throw new Error('SOLANA_PRIVATE_KEY not set');
        
        const secretKeyBytes = bs58.decode(this.solanaPrivateKey);
        const keypair = web3.Keypair.fromSecretKey(secretKeyBytes);
        const userAddress = keypair.publicKey.toString();

        const res = await this.getSwapData(chainIndex, fromTokenAddress, toTokenAddress, amount, slippagePercent, userAddress);
        
        if (res.code === '0') {
            const txObj = res.data[0].tx;
            const txBuffer = bs58.decode(txObj.data);
            const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'), 'confirmed');
            
            let transaction;
            try {
                transaction = web3.VersionedTransaction.deserialize(txBuffer);
                transaction.sign([keypair]);
            } catch (e) {
                transaction = web3.Transaction.from(txBuffer);
                transaction.partialSign(keypair);
            }
            
            const sig = await connection.sendRawTransaction(transaction.serialize());
            return { success: true, signature: sig };
        } else {
            return { success: false, error: res.msg };
        }
    }
}

module.exports = OKXDEXClient;
