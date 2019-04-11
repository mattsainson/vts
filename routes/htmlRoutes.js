var path = require('path');

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/dashboard", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });

  // Render 404 page for any unmatched routes
  // app.get("*", function (req, res) {
  //   res.send("404 not found");
  // });
};
