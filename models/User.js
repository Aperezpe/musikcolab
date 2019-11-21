/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    profile_pic: {
      type: DataTypes.TEXT,
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
    artist_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    use: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    has_password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'User',
    timestamps: false
  });
};