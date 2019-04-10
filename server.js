require("dotenv").config();
var express = require("express");
// var exphbs = require("express-handlebars");
var passport = require("passport");
var session = require("express-session");
var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

//load passport strategies
require("./config/passport.js")(passport, db.user);

//Sync Database
db.sequelize
  .sync()
  .then(function() {
    console.log("Nice! Database looks fine");
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Middleware For Passport
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Routes
// eslint-disable-next-line no-unused-vars
// var authRoute = require("./routes/auth")(app, passport);
require("./routes/htmlRoutes")(app);
require("./routes/app")(app, passport);
require("./routes/user")(app, passport);
require("./routes/appt")(app, passport);
require("./routes/request")(app, passport);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

//Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
