const jayson = require('jayson')
const { startMining, stopMining } = require('./mine')


// create a server
const server = new jayson.Server({
    startMining: function(_, callback) {
      callback(null, 'success!');
      startMining();
    },
    stopMining: function(_, callback) {
        stopMining();
        callback(null, 'successfully stopped!');
    }
});
  
server.http().listen(3038);
