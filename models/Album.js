/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('album', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    album_cover: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    genre: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dowload_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    use: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'album',
    timestamps: false
  });
};
