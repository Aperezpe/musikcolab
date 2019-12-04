/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('song_likes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'song',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    use: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'song_likes',
    timestamps: false
  });
};
