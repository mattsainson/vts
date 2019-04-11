module.exports = function (sequelize, DataTypes) {
    var Req = sequelize.define('Request', {
        requesterId: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            allowNull: false
        },
        requestDateTime: {
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
            type: DataTypes.TEXT,
            notEmpty: true,
            allowNull: false
        },
        requestState: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false,
            validate: {
            }
        },
        apptId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        tutorId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        stateChangedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });
    return Req;
};
