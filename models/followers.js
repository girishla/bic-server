module.exports = {

  identity: 'followers',

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
    userId: 'integer',
    createdBy:'string',
    createdAt: 'datetime',
    updatedAt: 'datetime'

  }

}
