const SHA256 = require('crypto-js/sha256')

class Block {
    constructor() {
        this.nonce = 0
        this.timesstamp = Date.now()
    }
    hash() {
        return SHA256(this.nonce + "" + this.timesstamp).toString()
    }
}

module.exports = Block