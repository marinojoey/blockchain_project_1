const SHA256 = require('crypto-js/sha256')

class Block {
    constructor() {
        this.nonce = 0
        this.timeStamp = Date.now()
        
    }
    hash() {
        return SHA256(this.nonce + "" + this.timeStamp).toString()
    }
}

module.exports = Block