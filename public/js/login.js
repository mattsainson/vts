

$('#login').on('click', function() {
  event.preventDefault();
  login();
});

function login() {
  userObj = {
    email : $('#email').val().trim(),
    password : $('#password').val().trim()
  };
  
  $.post('/signin', userObj, function(err, res) {
    if (err) {
      throw (err);
    } else {
      userObj.id = res.id;
      redirect('/dashboard.html');
      return('Success: Status(200)');
    }
  });
}
