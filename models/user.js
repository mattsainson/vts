module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false
    },
    constraints: {
      type: DataTypes.JSONTYPE,
      allowNull: true,
    },
    rank: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      default: 0
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });
  return User;
};
