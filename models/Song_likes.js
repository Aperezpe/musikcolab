/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Song_likes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Song_likes',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    use: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Song_likes',
    timestamps: false
  });
};
