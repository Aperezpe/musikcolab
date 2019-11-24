/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('song', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    length_track: {
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
    use: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'song',
    timestamps: false
  });
};
