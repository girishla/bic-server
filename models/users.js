module.exports = {

  identity: 'users',

  connection: 'diskDb',

  migrate: 'safe',

  attributes: {
    id: {
      "type": "integer",
      "autoIncrement": true,
      "primaryKey": true,
      "unique": true
    },
    userName: 'string',
    userLogin: 'string',
    userEmail: 'string',
    createdBy: 'integer',
    createdAt: 'datetime',
    updatedAt: 'datetime'
  }

}
