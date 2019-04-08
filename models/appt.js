module.exports = function (sequelize, DataTypes) {
    var Appt = sequelize.define('Appointment', {
        schedDateTime: {
            type: DataTypes.DATE,
            notEmpty: true,
            allowNull: false,
        },
        durationSchedMin: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            allowNull: false
        },
        durationActualMin: {
            type: DataTypes.INTEGER,
            default: 0,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        desc: {
            type: DataTypes.TEXT,
            allowNull: false,
            notEmpty: true
        },
        requestId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        maxAttendees: {
            type: DataTypes.INTEGER,
            defaultValue: 2,
            allowNull: false
        },
        apptState: {
            type: DataTypes.STRING,
            defaultValue: 'Scheduled',
            allowNull: false,
            notEmpty: true
        }
    });
    return Appt;
};
