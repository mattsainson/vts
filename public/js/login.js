

$('#login').on('click', function() {
  event.preventDefault();
  login();
});

function login() {

  userObj = {
    email : $('#email').val().trim(),
    password : $('#password').val().trim()
  };
  
  $.post('/signin', userObj, function(data, err) {
    if (err) {
      alert('Incorrect username and/or password');
      throw (err);
    } else {
      redirect('/dashboard.html');
      return('Success: Status(200)');
    }
  });

}
