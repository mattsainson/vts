// var authController = require('../controllers/authcontroller.js');
var db = require('../models');

module.exports = function (app, passport) {

    app.post('/login', function (req, res) {
        db.Users.findAll({}).then(function (user) {
            res.json(user);
        });
    });

    app.post('/signup', function (req, res) {
        var newUser = req.body;

        //lookup existing user by email to see if it already exists
        //if not, add user
        //if it does, send back user already exists

        db.Users.findOne({ email: newUser.email })
            .then(function (err, user) {
                if (user.id === 0) {
                    //no match for email
                    console.log(req.body.password);
                    var hashPassword = "(clearPassword)";
                    db.Users.create({
                        email: req.body.email,
                        password: hashPassword,
                        name: req.body.name,
                        userType: req.body.userType
                    }).then(function () {
                        // We have access to the new todo as an argument inside of the callback function
                        res.redirect('dashboard');
                    });

                } else {
                    //match for email

                }
            });


    });

    // app.post('/signup', authController.signup);

    // app.get("/signin", authController.signin);

    // app.post(
    //     "/signup",
    passport.authenticate("local-signup", {
        successRedirect: "/dashboard",
        failureRedirect: "/signup"
    });
    // );

    // app.get("/dashboard", isLoggedIn, authController.dashboard);

    // app.get("/logout", authController.logout);
    // function isLoggedIn(req, res, next) {
    //     if (req.isAuthenticated()) {
    //         return next();
    //     }
    //     res.redirect("/signin");
    // }

    // app.post(
    //     "/signin",
    //     passport.authenticate("local-signin", {
    //         successRedirect: "/dashboard",
    //         failureRedirect: "/signin"
    //     })
    // );
};
