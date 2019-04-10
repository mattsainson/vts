// var authController = require('../controllers/authcontroller.js');
var db = require('../models');

module.exports = function (app) {

    app.post('/signup', function (req, res) {
        var newUser = req.body;
        /*lookup existing user by email to see if it already exists
        if not, add user
        if it does, send back user already exists*/
        db.Users.findOne({ email: newUser.email })
            .then(function (err, user) {
                if (user.id === 0) {
                    //no match for email
                    // console.log(req.body.password);
                    // var hashPassword = "(clearPassword)";
                    db.Users.create({
                        email: req.body.email,
                        password: req.body.password,
                        name: req.body.name,
                        isTutor: req.body.isTutor,
                        isActive: true
                    }).then(function (id) {
                        res.status(200).send({ id: id });
                    });
                } else {
                    //match for email
                    res.status(500).send({ message: 'existing email' });
                }
            });
    });

    app.post('/signin', function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        db.User.findOne({ where: { email: email, password: password } }).then(function (user) {
            if (user.email === email) {
                res.status(200).send(user);
            } else {
                res.status(500).send({ message: 'wrong credentials' });
            }
        });
    });

    app.put('/logout/:userid', function (req, res) {
        var userId = req.params.userid;
        db.User.findOne({ where: { id: userId } }).then(function (user) {
            if (user.id === userId) {
                res.status(200).send({ message: 'you are logged out' });
            } else {
                res.status(500).send({ message: 'id not found' });
            }
        });
    });

    // /profile/getprofile/:userid

    app.get("/profile/getprofile/:userid", function (req, res) {
        var userId = req.params.userid;
        db.User.findOne({ where: { id: userId } })
            .then(function (user) {
                res.json(user);
            });
    });

    app.put("/profile/updateprofile/:userid", function (req, res) {
        var userId = req.params.userid;
        db.User.update(
            {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                tutorConstraints: req.body.tutorConstraints,
                isActive: req.body.isActive,
                isTutor: req.body.isTutor
            },
            {
                where: {
                    id: userId
                }
            }
        )
            .then(function (user) {
                res.status(200).send(user);
            });
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

};