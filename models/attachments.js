module.exports = {

  identity: 'attachments',

  connection: 'diskDb',

  /*migrate: 'safe',*/

  attributes: {
    id: {
      "type": "integer",
      "autoIncrement": true,
      "primaryKey": true,
      "unique": true
    },
    topicId:"integer",
    attachmentURL: 'string',
    createdBy:'string',
    createdAt: 'datetime',
    updatedAt: 'datetime'

  }

}
