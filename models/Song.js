/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('song', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Album',
        key: 'id'
      }
    },
    duration: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    song_url: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    download_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    like_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    song_title: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'song',
    timestamps: false
  });
};
