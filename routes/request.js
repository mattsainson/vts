var db = require('../models');

module.exports = function (app, passport) {
    console.log(passport);
    db.Request.findAll({}).then();
};