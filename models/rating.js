module.exports = function (sequelize, DataTypes) {
    var Rating = sequelize.define('Rating', {
        raterId: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            allowNull: false
        },
        ratedId: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            allowNull: false
        },
        apptId: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            allowNull: false,
            default: 0
        }
    });
    return Rating;
};
