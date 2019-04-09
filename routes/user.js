// var authController = require('../controllers/authcontroller.js');
var db = require('../models');

module.exports = function (app, passport) {

    app.post('/signup', function (req, res) {
        var newUser = req.body;
        /*lookup existing user by email to see if it already exists
        if not, add user
        if it does, send back user already exists*/
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
                        isTutor: req.body.isTutor,
                        isActive: true
                    }).then(function (id) {
                        res.status(200);
                        res.json( {id: id} ).end();
                        // We have access to the new todo as an argument inside of the callback function
                        //passport.authenticate("local-signup", {
                        });
                    //});

                } else {
                    res.status(500);
                    //match for email

                }
            });
    });

    app.post('/signin', function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        db.User({ where: { email: email, password: password } }).then(function(data) {
            if(data.email === email) {
                res.status(200);
                res.json ( {id: data.id} );
            } else {
                res.status(500);
            }
          });
    // app.post(
    //     "/signup",
    // passport.authenticate("local-signup", {
    // });
    // );

    // app.get("/dashboard", isLoggedIn,);

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
});
};