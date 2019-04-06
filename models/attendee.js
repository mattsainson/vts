module.exports = function (sequelize, DataTypes) {
    var Att = sequelize.define('Attendee', {
        apptId: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false
        },
        isHere: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false
        },
        enteredAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        leftAt: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    });
    return Att;
};
