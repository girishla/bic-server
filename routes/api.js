//controller for API routes
var controller = require('../controllers/api');
var json2html = require('node-json2html');
var jsonDocTransform = require('../utils/J2HTransform')
var jsonDocs = require('../utils/apiDocs');


module.exports = [

  //Returns an array of topics with an HTTP 200 OK response.
  //Example 1
  //'/topics?sort=id ASC&skip=1&limit=3&where={"id":[1,2]}'

  {
    method: 'GET',
    path: '/api/topics',
    config: {
      tags: ['api'], description: 'Get list of topics',
      notes: json2html.transform(jsonDocs.findTopics, jsonDocTransform),
      pre: [function (request, reply) {

        console.log('Processing Pre');
        return reply();

      }]
      , handler: {
        bedwetter: { prefix: '/api', populate: true }
      },
      ext: {
        onPostHandler: {
          method: function (request, reply) {
            request.server.plugins['ChatterSocketConnectionManager'].io.sockets.emit('Topic.getAll', request.response.source);
            //request.server.log('log', request.response.source);
            return reply.continue();
          }
        }
      }
    }
  },

  //Returns the integer number of topics matched with an HTTP 200 OK response.
  {
    method: 'GET',
    path: '/api/topics/count',

    config: {
      tags: ['api'], description: 'Get topic count',
      notes: json2html.transform(jsonDocs.getTopicCount, jsonDocTransform),
      handler: {
        bedwetter: { prefix: '/api' }
      }
    }
  },


  //  Returns topic id with an HTTP 200 OK response. Responds with an HTTP 404 Not Found response if the topic is not found.
  {
    method: 'GET',
    path: '/api/topics/{id}',
    config: {
      tags: ['api'], description: 'Get topic',
      notes: json2html.transform(jsonDocs.findTopic, jsonDocTransform),
      handler: {
        bedwetter: { prefix: '/api', populate: true }
      },
      ext: {
        onPostHandler: {
          method: function (request, reply) {

            if (!request.response.isBoom) {
              request.server.plugins['ChatterSocketConnectionManager'].io.sockets.emit('Topic.Get');
            }

            return reply.continue();
          }
        }
      }
    }

  },

  //  Returns an array of comments associated with topic id. Returns HTTP 200 OK if that topic is found. Returns an HTTP 404 Not Found response if that topic is not found.
  {
    method: 'GET',
    path: '/api/topics/{id}/comments',
    config: {
      tags: ['api'], description: 'Get comments for a topic',
      notes: json2html.transform(jsonDocs.getTopicComments, jsonDocTransform),
      handler: {
        bedwetter: { prefix: '/api' }
      }
    }
  },

  //Returns the integer number of comments associated with topic id. Returns HTTP 200 OK if that topic is found. Returns an HTTP 404 Not Found response if that topic is not found.

  {
    method: 'GET',
    path: '/api/topics/{id}/comments/count',
    config: {
      tags: ['api'], description: 'Get comments count for a topic',
      notes: json2html.transform(jsonDocs.getTopicCommentsCount, jsonDocTransform),
      handler: {
        bedwetter: { prefix: '/api', populate: true }
      }
    }
  },



  //Returns HTTP 204 No Content if comment childId is associated with topic id. Returns an HTTP 404 Not Found response if that topic is not found or that comment is not associated with the topic.

  {
    method: 'GET',
    path: '/api/comments/{id}',
    config: {
      tags: ['api'], description: 'Get a specific comment under a topic',
      notes: json2html.transform(jsonDocs.getTopicComment, jsonDocTransform),
      handler: {
        bedwetter: { prefix: '/api' }
      }
    }
  },

  //Creates a new topic using the request payload and returns it with an HTTP 201 Created response.

  {
    method: 'POST',
    path: '/api/topics',
    config: {
      tags: ['api'], description: 'Create a new Topic',
      notes: json2html.transform(jsonDocs.createTopic, jsonDocTransform),
      handler: {
        bedwetter: { prefix: '/api' }
      },
      ext: {
        onPostHandler: {
          method: function (request, reply) {
            if (!request.response.isBoom) {
              request.server.plugins['ChatterSocketConnectionManager'].io.sockets.emit('Topic.Create', request.response.source);
            }
            return reply.continue();
          }
        }
      }
    }
  },

  //Creates a new attachment file using the request payload and returns it with an HTTP 201 Created response.
  //Note that these files are not associated with any Topic as part of this endpoint. For that use /topics/{id}/attachments

  {
    method: 'POST',
    path: '/api/attachmentfiles',
    config: {
      tags: ['api'], description: 'Create a new Attachment File',
      notes: json2html.transform(jsonDocs.createAttachmentFile, jsonDocTransform),
      handler: function (request, reply) {

        if (request.payload.feedback.img) {
          var base64Data = request.payload.feedback.img.replace(/^data:image\/png;base64,/, "");
          var uuid = require('node-uuid');

          require("fs").writeFile("./attachments/bic_" + uuid.v1() + ".png", base64Data, 'base64', function (err) {
            if (err) return console.log(err);
            
            reply({ url: "bic_" + uuid.v1() + ".png"}).created('/api/attachments');
          });
        }
        else{
             reply("Nothing to do").code(200);
        }

      },
      ext: {
        onPostHandler: {
          method: function (request, reply) {
            // if (!request.response.isBoom) {
            //   request.server.plugins['ChatterSocketConnectionManager'].io.sockets.emit('Topic.Create', request.response.source);
            // }
            return reply.continue();
          }
        }
      }
    }
  },

  //  Creates a new comment using the request payload and associates that comment with topic id. Returns that comment with an HTTP 201 Created response. If that topic is not found, returns an HTTP 404 Not Found response.

  {
    method: 'POST',
    path: '/api/topics/{id}/comments',
    config: {
      tags: ['api'], description: 'Create a new Comment under a Topic',
      notes: json2html.transform(jsonDocs.createComment, jsonDocTransform),
      handler: {
        bedwetter: { prefix: '/api' }
      },
      ext: {
        onPostHandler: {
          method: function (request, reply) {
            if (!request.response.isBoom) {
              request.server.plugins['ChatterSocketConnectionManager'].io.sockets.emit('Comment.Create', request.params.id, request.response.source);
            }
            return reply.continue();
          }
        }
      }
    }
  },
  //  Creates a new attachment using the request payload and associates that attachment with topic id. Returns that attachment with an HTTP 201 Created response. If that topic is not found, returns an HTTP 404 Not Found response.
  {
    method: 'POST',
    path: '/api/topics/{id}/attachments',
    config: {
      tags: ['api'], description: 'Create a new attachment under a Topic',
      notes: json2html.transform(jsonDocs.createAttachment, jsonDocTransform),
      handler: {
        bedwetter: { prefix: '/api' }
      },
      ext: {
        onPostHandler: {
          method: function (request, reply) {
            if (!request.response.isBoom) {
              request.server.plugins['ChatterSocketConnectionManager'].io.sockets.emit('Attachment.Create', request.params.id, request.response.source);
            }
            return reply.continue();
          }
        }
      }
    }
  },




  //Associates comment childId with topic id. Returns an HTTP 204 No Content response on success. If the topic or comment are not found, returns an HTTP 404 Not Found response.
  {
    method: 'PUT',
    path: '/api/topics/{id}/comments/{childId}',
    config: {
      tags: ['api'], description: 'Associate an existing with a Topic',
      notes: json2html.transform(jsonDocs.associateComment, jsonDocTransform),
      handler: {
        bedwetter: { prefix: '/api' }
      },
      ext: {
        onPostHandler: {
          method: function (request, reply) {
            if (!request.response.isBoom) {
              request.server.plugins['ChatterSocketConnectionManager'].io.sockets.emit('Comment.Associate');
            }
            return reply.continue();
          }
        }
      }
    }
  },

  //Destroys topic id. Returns an HTTP 204 No Content response on success. If the topic doesn't exist, returns an HTTP 404 Not Found response.

  {
    method: 'DELETE',
    path: '/api/topics/{id}',
    config: {
      tags: ['api'], description: 'Destroy a Topic',
      notes: json2html.transform(jsonDocs.deleteTopic, jsonDocTransform),
      handler: {
        bedwetter: { prefix: '/api' }
      },
      ext: {
        onPostHandler: {
          method: function (request, reply) {
            if (!request.response.isBoom) {
              request.server.plugins['ChatterSocketConnectionManager'].io.sockets.emit('Topic.Delete', request.params.id);
              console.log('deleted topic');

            }
            return reply.continue();
          }
        }
      }
    }
  },

  //Removes association between topic id and comment childId. Returns an HTTP 204 No Content response on success. If the topic or comment doesn't exist, returns an HTTP 404 Not Found response.
  {
    method: 'DELETE',
    path: '/api/topics/{id}/comment/{childId}',
    config: {
      tags: ['api'], description: 'Remove association between topic id and comment childId',
      notes: json2html.transform(jsonDocs.disassociateComment, jsonDocTransform),
      handler: {
        bedwetter: { prefix: '/api' }
      },
      ext: {
        onPostHandler: {
          method: function (request, reply) {
            if (!request.response.isBoom) {
              request.server.plugins['ChatterSocketConnectionManager'].io.sockets.emit('Comment.Disassociate', request.params.id, request.params.childId);
            }
            return reply.continue();
          }
        }
      }
    }
  },

  //Updates topic id using the request payload (which will typically only contain the attributes to update) and responds with the updated topic. Returns an HTTP 200 OK response on success. If the topic doesn't exist, returns an HTTP 404 Not Found response
  {
    method: 'PATCH',
    path: '/api/topics/{id}',
    config: {
      tags: ['api'], description: 'Patch a Topic',
      notes: json2html.transform(jsonDocs.patchTopic, jsonDocTransform),
      handler: {
        bedwetter: { prefix: '/api' }
      },
      ext: {
        onPostHandler: {
          method: function (request, reply) {
            if (!request.response.isBoom) {
              request.server.plugins['ChatterSocketConnectionManager'].io.sockets.emit('Topic.Patch', request.response.source);
            }
            return reply.continue();
          }
        }
      }
    }
  },
  //Destroys Comment with id. Returns an HTTP 204 No Content response on success. If the comment doesn't exist, returns an HTTP 404 Not Found response.

  {
    method: 'DELETE',
    path: '/api/comments/{id}',
    config: {
      tags: ['api'], description: 'Destroy a Comment',
      notes: json2html.transform(jsonDocs.deleteComment, jsonDocTransform),
      handler: {
        bedwetter: { prefix: '/api' }
      },
      ext: {
        onPostHandler: {
          method: function (request, reply) {
            if (!request.response.isBoom) {
              request.server.plugins['ChatterSocketConnectionManager'].io.sockets.emit('Comment.Delete', request.params.id);

            }
            return reply.continue();
          }
        }
      }
    }
  }
]
//Using a non-bedwetter endpoint -  controller handler
/*
 {
 method: 'GET',
 path: '/api/topic1/{id}',
 config: controller.getTopic
 }
 ]
 */
