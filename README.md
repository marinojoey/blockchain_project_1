I created a local instance of a blockchain (as of now its really just an array because the blocks are not referencing) and a valid POW miner script. 

in the root folder `nodemon index`

in a new terminal window cd into scripts folder and either `node startMining` or `node stopMining` to start and stop the mining script. This script finds a nonce which when hashed will be less than the target difficulty that you are able to set to what you want. 