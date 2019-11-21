// this file makes the database connection, collects all the models
// and sets the associations
// other files can use this for database access by requiring it and
// assigning the exports

// assuming that this file (index.js) is in a subdirectory called models:
//  const models = require('./models');

// or (using deconstruction):
//  const { Person, PhoneNumber, Address, PersonAddress } = require('./models');

'use strict';

// database connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.db'
});

// import models
const User = sequelize.import("./User.js");
const Album = sequelize.import("./Album.js");
const Song = sequelize.import("./Song.js");
const Song_likes = sequelize.import("./Song_likes.js");

module.exports = {
  User,
  Album,
  Song,
  Song_likes
};

