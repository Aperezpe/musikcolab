/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('album', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    album_cover: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    genre: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    download_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    artist_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    album_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    artist_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    album_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    tableName: 'album',
    timestamps: false
  });
};
