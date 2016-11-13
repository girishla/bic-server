module.exports = [
  {
    register: require("dogwater"),
    options: require("./dogwater")
  },
  {
    register: require("good"),
    options: {
      reporters: [{
        reporter: require('good-console'),
        events: {
          response: '*',
          log: '*',
          error: '*',
          ops: '*'
        }
      }]
    }
  },
  {
    register: require('inert')
  },
  {
    register: require('blipp')
  },
  {
    register:require('../modules/socket-handler')
  },
  {
    register: require('bedwetter')

  },

  {register: require('vision')},
  {
    register: require('hapi-swaggered'),
    options: {
      tags: {
        'topics': 'Topics operations'
      },
      info: {
        title: 'biChatter API Docs',
        description: 'API Documentation for BI Chatter',
        version: '0.1.0'
      }
    }
  },
  {
    register: require('hapi-swaggered-ui'),
    options: {
      title: 'biChatter API Documentation',
      path: '/docs',
      authorization: { // see above
        field: 'apiKey',
        scope: 'header', // header works as well
        // valuePrefix: 'bearer '// prefix incase
        defaultValue: 'demoKey',
        placeholder: 'Enter your apiKey here'
      },
      swaggerOptions: {"docExpansion": "list"}
    }
  }
];
