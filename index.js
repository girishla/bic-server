
//This is the master plugin that loads all other plugins
//This is registered into the server in server,js

// Dependencies
var Hapi = require('hapi');
var Hoek = require('hoek');

// Server Config
var config = require('./config');

// Hapi Server Plugins
var plugins = require('./config/plugins');

exports.register = function(server, options, next) {

  server.register(plugins,function(err) {

    if (err) return next(err);

    // Make sure DB is available
    server.dependency('dogwater');

    server.route(require('./routes')(server, options));

    next();

  });

};

var Package = require("./../package.json");
exports.register.attributes = {
  name: 	Package.name,
  version: 	Package.version
}
