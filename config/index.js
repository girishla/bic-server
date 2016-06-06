/**
 * Dependencies.
 */
var path = require('path'),

rootPath = path.normalize(__dirname + '/../..');

var pjson = require('../../package.json');

console.log('version', pjson.version);

console.log('node env', process.env.NODE_ENV);

console.log(path.join(rootPath, 'client'));


var config = {
  root: rootPath,
  host: '0.0.0.0',
  port: parseInt(process.env.PORT, 10) || 8000,
  api: '',
  title: 'biChatter',
  package: pjson,
  hapi: {
    options: {

      routes: {
        cors: true,
        files: {
          relativeTo: path.join(rootPath, 'client')
        }
      }
    }
  }
}

config.env = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

switch(config.env){

  case 'development':
  case 'production':
  default:
    config.api = 'http://localhost:' + config.port;
    break;


}


config.serveBuild = (config.env === "production" || config.env === "staging");

// Defaults that you can access when you require this config.
module.exports = config;
