var db = require("../models");

module.exports = function(app, passport) {
  console.log(passport);
  db.Request.findAll({}).then();

  app.post("/request/newrequest", function(req, res) {
    var newrequest = req.body;
    Request.push(newrequest);
    res.json(newrequest);
  });

  app.get("/request/getrequest/:requestid", function(req, res) {
    var id = req.params.requestid;
    db.Request.findOne({ where: { id: id } }).then(function(request) {
      res.json(request);//.end();
    });
  });

  app.get("/request/getrequests/:userid", function(req, res) {
    var id = req.params.userid;
    db.Request.findAll({ where: {id: id} }).then(function(request) {
        res.json(request);
    });
  });
};