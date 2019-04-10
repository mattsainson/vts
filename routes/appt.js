var db = require('../models');

module.exports = function (app) {

    app.post("/appointment/newappointment", function (req, res) {
        var newAppointment = req.body;
        db.Appointment.create(newAppointment)
            .then(function (appointment) {
                res.status(200).send(appointment);
            });
    });

    app.get("/appointment/getappointment/:apptid", function (req, res) {
        var apptId = req.params.apptid;
        db.Appointment.findOne({ where: { id: apptId } })
            .then(function (appointment) {
                res.json(appointment);
            });
    });

    app.get("/appointment/getappointments/:userid", function (req, res) {
        var attendeeId = req.params.userid;
        db.Attendee.findAll({
            where: { attendeeId: attendeeId },
            include: [{ model: db.Appointment }]
        })
            .then(function (appointments) {
                res.json({ appointments: appointments });
            });
    });

    app.put("/appointment/updateappointment/:apptid", function (req, res) {
        var apptId = req.params.apptid;
        db.Appointment.update(
            {
                schedDateTime: req.body.schedDateTime,
                durationSchedMin: req.body.durationSchedMin,
                subject: req.body.subject,
                desc: req.body.desc,
                maxAttendees: req.body.maxAttendees
            },
            { where: { id: apptId } })
            .then(function () {
                res.status(200);
            });
    });

    app.put("/appointment/cancelappointment/:apptid", function (req, res) {
        var apptId = req.params.apptid;
        db.Appointment.update(
            { apptState: 'Cancelled' },
            { where: { id: apptId } })
            .then(function () {
                res.status(200);
            });
    });

    app.get("/appointment/getattendees/:apptid", function (req, res) {
        var apptId = req.params.apptid;
        db.Appointment.findAll({ where: { apptId: apptId } })
            .then(function (attendees) {
                res.json({attendees: attendees});
            });
    });

};