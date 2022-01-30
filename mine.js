const db = require('./db')
const Block = require('./Block');
const { joesChain } = require('./db');
let difficulty = 0
// const TARGET_DIFFICULTY = BigInt("0x" + "0".repeat(difficulty) + "F".repeat(64 - difficulty))
// const TARGET_DIFFICULTY = BigInt("0x" + "0000" + "F".repeat(60))
// console.log(TARGET_DIFFICULTY)
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
    const TARGET_DIFFICULTY = BigInt("0x" + "0".repeat(difficulty) + "F".repeat(64 - difficulty))

    while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
        block.nonce++;
    };

    if ( db.joesChain.blocks.length > 0 ) {

        let previousBlock = db.joesChain.blocks[db.joesChain.blocks.length - 1]

        let previousTimeStamp = previousBlock.timeStamp
        let previousHash = previousBlock.hash()

        if (previousHash != db.joesChain.blocks[db.joesChain.blocks.length -1].hash()) {
            console.log(`Error: ${previousHash} does not match the previous block's hash.`)
        }
        if (previousHash == db.joesChain.blocks[db.joesChain.blocks.length -1].hash()) {
            block.previousHash = previousHash
            console.log(TARGET_DIFFICULTY)
            let timeOfMine = (block.timeStamp - previousTimeStamp)
            console.log(timeOfMine)

            if (timeOfMine < 1800) {
                difficulty++;
            } else if (timeOfMine >= 2000) {
                difficulty--;
            }

            db.joesChain.addBlock(block)

            console.log(`Just mined block #${db.joesChain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`)
    
            console.log(`previous block's hash: ` + block.previousHash)
    
            setTimeout(mine, 1)
        }
    }

    if( db.joesChain.blocks.length == 0 ) {
        db.joesChain.addBlock(block)

        console.log(`Just mined block #${db.joesChain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`)

        setTimeout(mine, 1)
    }

    }

module.exports = { startMining, stopMining };