// This is the assets controller. Goal is to serve css, js, partials, images, or bower packages.
var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    app: {
        handler: {
            directory: { path: rootPath + '/client/app/' }
        }
    },
    assets: {
        handler: {
            directory: { path: rootPath + '/client/assets' }
        }
    },
    attachments: {
        handler: {
            directory: { path: rootPath + '/bic-server/attachments' }
        }
    },
    css: {
        handler: {
            directory: { path: rootPath + '/client/app/css' }
        }
    },
    js: {
        handler: {
            directory: { path: rootPath + '/client/app' }
        }
    },
    bower_components: {
        handler: {
            directory: { path: rootPath + '/client/bower_components' }
        }
    }
}
