require("dotenv").config();
var express = require("express");
// var exphbs = require("express-handlebars");
// var passport = require("passport");
// var session = require("express-session");
var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

//load passport strategies
//require("./config/passport.js")(passport, db.user);

//Sync Database
db.sequelize
  .sync()
  .then(function () {
    console.log("Nice! Database looks fine");
  })
  .catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Middleware For Passport
// app.use(
//   session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
// ); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

// Routes
// eslint-disable-next-line no-unused-vars
// var authRoute = require("./routes/auth")(app, passport);
require("./routes/htmlRoutes")(app);
require("./routes/app")(app);
require("./routes/user")(app);
require("./routes/appt")(app);
require("./routes/request")(app);
require("./routes/rating")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

//Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });

  // db.User.create({
  //   email: 'user1@vts.com',
  //   password: '123',
  //   name: 'user1',
  //   rank: 100,
  //   lastLoginAt: '2019-01-01',
  //   isActive: true
  // });

  // db.User.create({
  //   email: 'user2@vts.com',
  //   password: '123',
  //   name: 'user2',
  //   rank: 100,
  //   lastLoginAt: '2019-01-01',
  //   isActive: true
  // });

  // db.User.create({
  //   email: 'tutor@vts.com',
  //   password: '123',
  //   name: 'tutor',
  //   tutorConstraints: 'available: {["Sun","Mon","Tue","Wed","Thur","Fri","Sat"], subjects: ["Math","English","History","Science"]}',
  //   rank: 79.3,
  //   lastLoginAt: '2019-01-01',
  //   isActive: true,
  //   isTutor: true
  // });

  // db.Request.create({
  //   requesterId: 1,
  //   requestDateTime: '2019-01-01',
  //   durationMin: 25,
  //   subject: 'Math',
  //   desc: 'whatever',
  //   requestState: 'Pending',
  //   apptId: 0,
  //   tutorId: 0
  // });

  // db.Request.create({
  //   requesterId: 1,
  //   requestDateTime: '2019-01-02',
  //   durationMin: 30,
  //   subject: 'English',
  //   desc: 'please respond, I have a big test coming up',
  //   requestState: 'Pending',
  //   apptId: 0,
  //   tutorId: 0
  // });

  // db.Appointment.create({
  //   schedDateTime: '2019-01-01',
  //   durationSchedMin: 25,
  //   durationActualMin: 0,
  //   url: 'www.vts.com',
  //   subject: 'Math',
  //   desc: 'math appt',
  //   requestId: 1,
  //   maxAttendees: 2,
  //   apptState: 'Scheduled'
  // });

  // db.Appointment.create({
  //   schedDateTime: '2019-01-02',
  //   durationSchedMin: 30,
  //   durationActualMin: 0,
  //   url: 'www.vts.com',
  //   subject: 'English',
  //   desc: 'English',
  //   requestId: 1,
  //   maxAttendees: 2,
  //   apptState: 'Scheduled'
  // });

  // db.Attendee.create({
  //   apptId: 1,
  //   attendeeId: 1,
  //   isTutor: false,
  //   isHere: false,
  // });

  // db.Attendee.create({
  //   apptId: 1,
  //   attendeeId: 3,
  //   isTutor: true,
  //   isHere: false
  // });

  // db.Rating.create({
  //   raterId: 1,
  //   ratedId: 3,
  //   rating: 5,
  //   apptId: 1,
  // });

  // db.Rating.create({
  //   raterId: 3,
  //   ratedId: 1,
  //   rating: 5,
  //   apptId: 1
  // });
});

module.exports = app;
