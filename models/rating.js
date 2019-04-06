module.exports = function (sequelize, DataTypes) {
    var Rating = sequelize.define('Rating', {
        userId: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            allowNull: false
        },
        ratedId: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL,
            notEmpty: true,
            allowNull: false
        }
    });
    return Rating;
};
