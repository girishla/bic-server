var Path = require('path');
var config = require('./index');

module.exports = {

  models: Path.normalize(__dirname + '/../models'),

  connections: {
    diskDb: {
      adapter: 'disk'
    }
  },

  adapters: {
    disk: require('sails-disk')
  },

}
