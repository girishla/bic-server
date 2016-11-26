module.exports = {

  identity: 'topics',

  connection: 'diskDb',

  migrate: 'safe',

  attributes: {
    id: {
      "type": "integer",
      "autoIncrement": true,
      "primaryKey": true,
      "unique": true
    },
    contextDim: 'string',
    contextDimSHA1: 'string',
    contextFilter: 'string',
    contextFilterSHA1: 'string',
    dashboardPath: 'string',
    analysisPath: 'String',
    text: 'string',
    ownerId:'integer',
    createdBy: 'integer',
    createdAt: 'datetime',
    updatedAt: 'datetime',
    comments: {
      collection: 'comments',
      via: 'topicId'
    },
    attachments: {
      collection: 'attachments',
      via: 'topicId'
    },
    followers: {
      collection: 'followers',
      via: 'topicId'
    }
  }

}
