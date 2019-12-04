/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    artist_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    profile_pic: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    profile_video: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    use: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    has_password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'user',
    timestamps: false
  });
};
