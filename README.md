I created a local instance of a blockchain and a POW miner script to add new blocks to the chain. The mining function will generate an independent hash of the previous block's properties and compare it to the hash that that block produced for itself. The function will always pass this conditional because they process the same data the same exact way. I am including it in this demo as a proof of concept to show that when a block is mined and produces its own hash, that the next block hoping to be mined will need to process the data again to produce its own hash of that block and verify it before being appended to longest chain. If the hash does not match (meaning foul play) then thay miner has wasted their proof-of-work and opportunity of a block reward. 

Directions:

In the root folder `nodemon index` in your terminal. 

In a new terminal, cd into the scripts folder and either `node startMining` or `node stopMining` to start and stop the mining script. This script finds a nonce which when hashed will be less than the target difficulty.

In order to change the target difficulty navigate to `mine.js` and adjust `TARGET_DIFFICULTY` to your liking. The lower the number the harder it will be. 