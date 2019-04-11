/* eslint-disable no-unused-vars */
var db = require("../models");
var moment = require('moment');

module.exports = function (app) {
  // console.log(passport);

  app.post("/request/newrequest", function (req, res) {
    var newRequest = req.body;
    var requestDateTime = newRequest.requestDateTime; //string
    //get the request date day name
    var dayName = moment(requestDateTime).format('dddd');
    //look for users that are tutors
    db.User.findAll({ where: { isTutor: true } })
      .then(function (users) {
        var constraints = null;
        var tutorId = 0;
        var highestRank = 0;
        for (var i = 0; i < users.length; i++) {
          console.log('users.length',users.length);
          console.log('tutorConstraints',users[i].tutorConstraints, 'userid', users[i].id);
          var constraintsStr = users[i].tutorConstraints;
          var constraintsObj = JSON.parse(constraintsStr);
          var available = constraintsObj.available;
          //check each one if the request day name is in their constraint
          if (available.indexOf(dayName) !== -1) {
            if (users[i].rank > highestRank) {
              //if match and rank is higher replace rank and id
              highestRank = users[i].rank;
              tutorId = users[i].id;
            }
          }
        }
        //get highest id and use to create appt.
        //for now don't set the requestId; we'll go back and set it later
        db.Appointment.create({
          schedDateTime: newRequest.requestDateTime,
          durationSchedMin: newRequest.durationMin,
          subject: newRequest.subject,
          desc: newRequest.desc,
          url: 'http://google.com'
        })
          .then(function (appointment) {
            // first create the requester attendee row
            db.Attendee.create({
              apptId: appointment.id,
              attendeeId: newRequest.requesterId,
              isTutor: false,
            })
              .then(function (student) {
                db.Attendee.create({
                  apptId: appointment.id,
                  attendeeId: tutorId,
                  isTutor: true,
                })
                  .then(function (tutor) {
                    db.Request.create({
                      requesterId: newRequest.requesterId,
                      requestDateTime: newRequest.requestDateTime,
                      durationMin: newRequest.durationMin,
                      subject: newRequest.subject,
                      desc: newRequest.desc,
                      requestState: 'Accepted',
                      apptId: appointment.id,
                      tutorId: tutorId,
                      stateChangedAt: moment().format()
                    })
                    .then(function (request) {
                      //now go back and update the appointment to set the requestId
                      db.Appointment.update(
                        {
                          requestId: request.id
                        },
                        { where: { id: appointment.id } })
                        .then(function () {
                          res.status(200).send(request);
                        });
                    });
                  });
              });
          });
      });
  });

  app.get("/request/getrequest/:requestid", function (req, res) {
    var requestId = req.params.requestid;
    db.Request.findOne({ where: { id: requestId } })
      .then(function (request) {
        res.json(request);
      });
  });

  app.get("/request/getrequests/:userid", function (req, res) {
    var requesterId = req.params.userid;
    db.Request.findAll({ where: { requesterId: requesterId } })
      .then(function (request) {
        res.json({ requests: request });
      });
  });

  app.put("/request/cancelrequest/:requestid", function (req, res) {
    var requestId = req.params.requestid;
    db.Request.update(
      { requestState: 'Cancelled' },
      { where: { id: requestId } })
      .then(function () {
        res.status(200).end();
      });
  });

};