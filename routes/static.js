//controller for static resources
var controller = require('../controllers/static');

module.exports = [
  {
    method: 'GET',
    path: '/app/{path*}',
    config: controller.app
  },
  {
    method: 'GET',
    path: '/assets/{path*}',
    config: controller.assets
  },
  {
    method: 'GET',
    path: '/bower_components/{path*}',
    config: controller.bower_components
  }
]
