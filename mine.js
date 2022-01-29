const db = require('./db')
const Block = require('./Block')
const TARGET_DIFFICULTY = BigInt("0x0000" + "1".repeat(60))

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
    db.joesChain.addBlock(block)
    console.log(`Just mined block #${db.joesChain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`)
    setTimeout(mine, 1)
}

module.exports = { startMining, stopMining };