// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.








//*****************************************************
//*****************************************************
//*****************************************************
// THE FOLLOWINBG API CONTROLLERS HAVE BEEN REPLACED BY BEDWETTER
//*****************************************************
//*****************************************************
//*****************************************************



module.exports = {

  getTopics: {
    handler: function (request, reply) {

      // Grab the DB from dogwater
      var db = request.server.plugins['dogwater'];

      db.topics.find().then(function (topics) {
        reply({topics: topics});
      });

    }
  },

  getTopic: {

    tags: ['api'],

    handler: function (request, reply) {


      console.log('In getTopic handler...');

      // Grab the DB from dogwater
      var db = request.server.plugins['dogwater'];

      db.topics.findOne(request.params.id)
        .then(function (topic) {
          reply({topic: topic});

        });
    }
  },


  postTopic: {
    handler: function (request, reply) {

      // Grab the DB from dogwater
      var db = request.server.plugins['dogwater'];


      const topic = {
        text: request.payload.text

      }

      db.topics.create(topic)
        .then(function (newtopic) {
          reply(newtopic).created('/api/topics/' + newtopic.id);

        });
    }
  }

  , justLog: {

    handler: function (request, reply) {

      reply({comment:'whaaaat'});

    }

  }


}
