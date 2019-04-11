var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.initialize();

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// var authController = require('../controllers/authcontroller.js');

// module.exports = function(app, passport) {
//   app.get('/signup', authController.signup);

//   app.get("/signin", authController.signin);

//   app.post(
//     "/signup",
//     passport.authenticate("local-signup", {
//       successRedirect: "/dashboard",
//       failureRedirect: "/signup"
//     })
//   );

//   app.get("/dashboard", isLoggedIn, authController.dashboard);

//   app.get("/logout", authController.logout);
//   function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect("/signin");
//   }

//   app.post(
//     "/signin",
//     passport.authenticate("local-signin", {
//       successRedirect: "/dashboard",
//       failureRedirect: "/signin"
//     })
//   );
// };
