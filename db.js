const Blockchain = require('./Blockchain')

const db = {
    joesChain: new Blockchain()
}

module.exports = db;