const SHA256 = require('crypto-js/sha256')

class Block {
    constructor() {
        this.nonce = 0
        this.timesStamp = Date.now()
        
    }
    hash() {
        return SHA256(this.nonce + "" + this.timesStamp).toString()
    }
}

module.exports = Block