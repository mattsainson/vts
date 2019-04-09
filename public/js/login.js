var userObj = require('userObj');

$('#login').on('click', function() {
  event.preventDefault();
  login();
});

function login() {

  userObj.email = $('#email').val().trim(),
  userObj.password = $('#password').val().trim()

  var URL = 'https://agile-earth-56750.herokuapp.com/';
  
  $.post(URL + '/signin', userObj.email, userObj.password, function(data, err) {
    if (err) {
      alert('Incorrect username and/or password');
      throw (err);
    } else {
      redirect('/dashboard');
      return('Success: Status(200)');
    }
  });

}
