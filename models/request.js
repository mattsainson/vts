module.exports = function (sequelize, DataTypes) {
    var Req = sequelize.define('Request', {
        userId: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            allowNull: false
        },
        reqDateTime: {
            type: DataTypes.DATE,
            notEmpty: true,
            allowNull: false
        },
        durationMin: {
            type: DataTypes.INTEGER,
            default: 0,
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false
        },
        desc: {
            type: DataTypes.DATE,
            notEmpty: true,
            allowNull: false
        },
        reqState: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false,
            validate: {

            }
        },
        apptId: {
            type: DataTypes.INTEGER,
            default: 0,
            allowNull: false
        },
        fullfilledAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });
    return Req;
};
