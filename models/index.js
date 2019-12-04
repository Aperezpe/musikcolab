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
const User = sequelize.import("./user.js");
const Album = sequelize.import("./album.js");
const Song = sequelize.import("./song.js");
const Song_likes = sequelize.import("./song_likes.js");




Album.hasMany(Song, { foreignKey: "album_id", as: "Songs" });
Song.belongsTo(Album, { foreignKey: "id" });
User.hasMany(Album, {foreignKey: "user_id", as: "Albums"})
Album.belongsTo(User, {foreignKey: "id"})


module.exports = {
  User,
  Album,
  Song,
  Song_likes
};

