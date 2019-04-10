var db = require("../models");

module.exports = function(app) {
  // console.log(passport);

  app.post("/request/newrequest", function(req, res) {
    var newRequest = req.body;
    db.Request.create(newRequest)
    .then(function(request){
      res.status(200).send(request);
    });
  });

  app.get("/request/getrequest/:requestid", function(req, res) {
    var requestId = req.params.requestid;
    db.Request.findOne({ where: { id: requestId } })
    .then(function(request) {
      res.json(request);
    });
  });

  app.get("/request/getrequests/:userid", function(req, res) {
    var requesterId = req.params.userid;
    db.Request.findAll({ where: {requesterId: requesterId} })
    .then(function(request) {
        res.json({requests: request});
    });
  });

  app.put("/request/cancelrequest/:requestid", function(req, res) {
    var requestId = req.params.requestid;
    db.Request.update(
      {requestState: 'Cancelled'},
      { where: {id: requestId} })
    .then(function() {
        res.status(200);
    });
  });

};