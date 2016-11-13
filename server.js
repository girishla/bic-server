//Server Standalone Executable. index.js exposes a plugin that can in theory be included separately in a wider context Bigmantra project
//everything is modularised as a plugin so required solutions can be assembled on demand. This also enforces separation of concerns.

// Dependencies
var Hapi = require('hapi');

// Server Config
var config = require('./config');

// Create a server with a host, port, and options
var server = new Hapi.Server({
/*  debug: {
    log: ['error', 'log']
  }*/
});


//Added this as for some reason Hapi doesnt seem to log errors properly otherwise

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});


server.select('api');

//Connection object -  routes is a route options object used to set the default configuration for every route.
server.connection({
  host: config.host,
  port: config.port,
  routes: config.hapi.options.routes,
  labels: ['api']
});


//Reference the main plugin
var registerOpts = [
  {
    register: require("./index")
  }
];


var start = function (cb) {

  server.register(registerOpts, function (err) {

    if (err) {

      console.log('An error................')
      console.error(err);
      throw err;

    }
    server.start(function () {

      console.log("Hapi server started @ " + server.info.uri.replace('0.0.0.0', 'localhost'));

      if (cb) {
        cb();
      }

    });

  });

}

module.exports = {
  server: server,
  registerOpts: registerOpts,
  start: start
}


start();

/*
 if (!module.parent) {

 start(startSync);
 }*/
