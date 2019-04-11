var db = require('../models');

module.exports = function (app) {

    app.post("/rating/newrating", function (req, res) {
        var newRating = req.body;
        db.Rating.create(newRating)
            .then(function (rating) {
                res.status(200).send(rating);
            });
    });

    app.get("/rating/getapptuserrating/:apptid/:userid", function (req, res) {
        var apptId = req.params.apptid;
        var raterId = req.params.userid;
        db.Rating.findOne({ where: { apptId: apptId, raterId: raterId } })
            .then(function (rating) {
                res.json(rating);
            });
    });

    app.get("/rating/getapptratings/:apptid", function (req, res) {
        var apptId = req.params.apptid;
        db.Rating.findAll({ where: { apptId: apptId } })
            .then(function (ratings) {
                res.json({ratings: ratings});
            });
    });

    app.put("/rating/updaterating/:ratingid", function (req, res) {
        var ratingId = req.params.ratingid;
        console.log('rating',req.body.rating);
        db.Rating.update(
            {
                rating: req.body.rating,
            },
            { where: { id: ratingId } })
            .then(function () {
                res.status(200).end();
            });
    });

};