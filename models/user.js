module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
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
    tutorConstraints: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rank: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    isTutor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });
  return User;
};
