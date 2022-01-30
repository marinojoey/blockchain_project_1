const db = require('./db')
const Block = require('./Block');
const { joesChain } = require('./db');
const TARGET_DIFFICULTY = BigInt("0x0" + "1".repeat(63))
const SHA256 = require('crypto-js/sha256')

let mining = false;

function startMining() {
    mining = true;
    mine();
}
function stopMining() {
    mining = false;
}

function mine() {
    if (!mining) return;

    const block = new Block();

    while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
        block.nonce++;
    };

    if ( db.joesChain.blocks.length > 0 ) {

        let previousBlock = db.joesChain.blocks[db.joesChain.blocks.length - 1]
        let previousHash = previousBlock.hash()

        if (previousHash != db.joesChain.blocks[db.joesChain.blocks.length -1].hash()) {
            console.log(`Warning: Error. ${previousHash} does not match the previous block's hash.`)
        }
        if (previousHash == db.joesChain.blocks[db.joesChain.blocks.length -1].hash()) {
            block.previousHash = previousHash
            db.joesChain.addBlock(block)

            console.log(`Just mined block #${db.joesChain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`)
    
            console.log(`previous block's hash: ` + block.previousHash)
    
            setTimeout(mine, 1000)
        }
    }

    if( db.joesChain.blocks.length == 0 ) {
        db.joesChain.addBlock(block)

        console.log(`Just mined block #${db.joesChain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`)

        setTimeout(mine, 1000)
    }

    }

module.exports = { startMining, stopMining };