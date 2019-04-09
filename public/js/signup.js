var userObj = require('userObj');

$('#signup').on('click', function() {
  event.preventDefault();
  signUp();
});

function signUp() {

  userObj = {
    name : $('#name').val().trim(),
    email : $('#email').val().trim(),
    password : $('#password').val().trim(),
    isTutor: $('#hour').children('option:selected').val();
  };
 
  var URL = 'https://agile-earth-56750.herokuapp.com/';
  
  $.post(URL + '/signin', userObj, function(data, err) {
    if (err) {
      alert('Incorrect username and/or password');
      throw (err);
    } else {
      redirect('/dashboard');
      return('Success: Status(200)');
    }
  });

}
