module.exports = {

  identity: 'comments',

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
    text: 'string',
    createdBy:'string',
    createdAt: 'datetime',
    updatedAt: 'datetime'

  }

}
