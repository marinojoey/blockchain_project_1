const jayson = require('jayson');
const mine = require('../mine');


// create a client
const client = jayson.Client.http({
  port: 3038
});

module.exports = client