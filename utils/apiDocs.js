module.exports = {

  findTopics: {
    description: 'Find one or more Topics and associated comments. If comments are not required, they can be switched off by passing populate=false as a query parameter',
    returns: 'Object Array: an array of topics with an HTTP 200 OK response',
    usage: 'GET /api/topics?sort=id DESC&skip=0&limit=10&where={"text":{"contains":"mme"}}'
  },
  findTopic: {
    description: 'Find exactly one Topic',
    returns: 'Object:  Returns an array of comments associated with topic id. Returns HTTP 200 OK if that topic is found. Returns an HTTP 404 Not Found response if that topic is not found.',
    usage: 'GET  /api/topics/{topicId}'
  },
  getTopicCount: {
    description: 'Get the number of Topics.',
    returns: 'Number:the integer number of comments associated with topic id. Returns HTTP 200 OK if that topic is found. Returns an HTTP 404 Not Found response if that topic is not found.',
    usage: 'GET /api/topics/count'
  },
  getTopicComments: {
    description: 'Get comments for a topic',
    returns: 'Object Array: Array of comments for the topic',
    usage: 'GET /api/topics/{topicId}/comments'
  },
  getTopicCommentsCount: {
    description: 'Get comments count for a topic',
    returns: 'Number: The count of comments under a topic',
    usage: 'GET /api/topics/{topicId}/comments/count'
  },
  getTopicComment: {
    description: 'Get a specific comment under a topic.',
    returns: 'Object: A comment object under a topic.Returns HTTP 204 No Content if comment childId is associated with topic id. Returns an HTTP 404 Not Found response if that topic is not found or that comment is not associated with the topic.',
    usage: 'GET /api/comments/{commentId}'
  },
  createTopic: {
    description: 'Creates a new topic using the request payload and returns it with an HTTP 201 Created response.',
    returns: 'Object: The newly created Topic',
    usage: 'POST /api/topics'
  },

  createComment: {
    description: 'Creates a new comment using the request payload and associates that comment with topic id. ',
    returns: 'Object: Returns the newly created comment with an HTTP 201 Created response. If that topic is not found, returns an HTTP 404 Not Found response',
    usage: 'POST /api/topics/{topicId}/comments'
  },
  createAttachment: {
    description: 'Creates a new attachment using the request payload and associates that attachment with topic id. ',
    returns: 'Object: Returns the newly created attachment URL with an HTTP 201 Created response. If that topic is not found, returns an HTTP 404 Not Found response',
    usage: 'POST /api/topics/{topicId}/attachments'
  },
  createAttachmentFile: {
    description: 'Creates a new attachment file using the request payload',
    returns: 'Object: Returns the newly created attachment URL with an HTTP 201 Created response.',
    usage: 'POST /api/attachmentfiles'
  },  
  associateComment: {
    description: 'Associates comment childId with topic id.',
    returns: 'Returns an HTTP 204 No Content response on success. If the topic or comment are not found, returns an HTTP 404 Not Found response.',
    usage: 'PUT /api/topics/{topicId}/comments/{commentId}'
  },
  deleteTopic: {
    description: 'Destroys topic with id. ',
    returns: 'Returns an HTTP 204 No Content response on success. If the topic doesnt exist, returns an HTTP 404 Not Found response.',
    usage: 'DELETE /api/topics/{topicId}'
  },

  disassociateComment: {
    description: 'Removes association between topic id and comment childId. ',
    returns: 'Returns an HTTP 204 No Content response on success. If the topic or comment doesnt exist, returns an HTTP 404 Not Found response.',
    usage: 'DELETE /api/topics/{topicId}/comment/{commentId}'
  },
  patchTopic: {
    description: 'Updates topic id using the request payload (which will typically only contain the attributes to update)',
    returns: 'Object: Responds with the updated topic. Returns an HTTP 200 OK response on success. If the topic doesnt exist, returns an HTTP 404 Not Found response',
    usage: 'PATCH /api/topics/{topicId}'
  },
  deleteComment: {
    description: 'Destroys comment with id. ',
    returns: 'Returns an HTTP 204 No Content response on success. If the comment doesnt exist, returns an HTTP 404 Not Found response.',
    usage: 'DELETE /api/comments/{commentId}'
  },




}


