var userObj = require('userObj');

$('#login').on('click', function() {
  event.preventDefault();
  login();
});

function login() {

  userObj = {
    email : $('#email').val().trim(),
    password : $('#password').val().trim()
  };

  var URL = 'https://agile-earth-56750.herokuapp.com/';
  
  $.post(URL + '/signin', userObj, function(data, err) {
    if (err) {
      alert('Incorrect username and/or password');
      throw (err);
    } else {
      redirect('/dashboard.html');
      return('Success: Status(200)');
    }
  });

}
