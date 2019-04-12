var db = require('../models');

module.exports = function (app) {

    app.post("/appointment/newappointment/:tutorid", function (req, res) {
        var tutorId = req.params.tutorid;
        var newAppointment = req.body;
        newAppointment.url = 'http://google.com';
        db.Appointment.create(newAppointment)
            .then(function (appointment) {
                db.Attendee.create({
                    apptId: appointment.id,
                    attendeeId: tutorId,
                    isTutor: true,
                })
                    // eslint-disable-next-line no-unused-vars
                    .then(function (tutor) {
                        res.status(200).send(appointment);
                    });
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
        // console.log('attendeeId',attendeeId);
        db.Attendee.findAll({
            where: { attendeeId: attendeeId }
        })
            .then(function (attendees) {
                //we now have an array of attendee rows
                //loop through and build an array of appointment rows building an array of apptIds that we'll use to get the appointments
                var apptIds = [];
                for(var i=0;i<attendees.length;i++) {
                    apptIds.push(attendees[i].apptId);
                }
                db.Appointment.findAll({ where: { id: apptIds } })
                .then(function (appointments) {
                    for(var i=0;i<appointments.length;i++) {
                        //lookup the matching attendee element so we can add more key/values to it from appointments
                        var pos = attendees.map(function(e) { return e.apptId; }).indexOf(appointments[i].id);
                        // console.log('pos', pos);
                        if(pos !== -1) {
                            // console.log('attendees', attendees[pos]);
                            appointments[i] = appointments[i].toJSON();
                            appointments[i].isTutor = attendees[pos].isTutor;
                            appointments[i].isHere = attendees[pos].isHere;
                            // console.log(appointments[i].id);
                            // console.log(appointments[i].isHere);
                        }
                    }
                    // var copy_obj = {}
                    // Object.keys(appointments).forEach((item) => {
                    //     console.log(appointments[item]);
                    // })
                    // console.log(appointments[1].toJSON());
                    res.json({ appointments: appointments });
                });
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
                res.status(200).end();
            });
    });

    app.put("/appointment/cancelappointment/:apptid", function (req, res) {
        var apptId = req.params.apptid;
        db.Appointment.update(
            { apptState: 'Cancelled' },
            { where: { id: apptId } })
            .then(function () {
                res.status(200).end();
            });
    });

    app.get("/appointment/getattendees/:apptid", function (req, res) {
        var apptId = req.params.apptid;
        db.Attendee.findAll({ where: { apptId: apptId } })
            .then(function (attendees) {
                res.json({ attendees: attendees });
            });
    });

};