//var db = require('../models');

module.exports = function (app, passport) {
    console.log(passport);
    //db.Appt.findAll({}).then();

    app.post('/request/newrequest', function(req,res){
        var newappointment = req.body;
        Appt.push(newappointment);
        res.json(newappointment);
    });

    app.get('appointment/getappointment/:apptid', function(req,res){
        res.json(Appt);
    });

    app.get('/appointment/getapppointments/:userid', function(req, res){
        res.json(Appt);
        console.log(Appt);
    });







};