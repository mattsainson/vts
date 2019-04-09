$('#signup').on('click', function() {
  event.preventDefault();
  console.log('signup clicked');
  signUp();
});

function signUp() {

  userObj = {
    name : $('#name').val().trim(),
    email : $('#email').val().trim(),
    password : $('#password').val().trim(),
    isTutor: $('#hour').children('option:selected').val()
  };
  
  $.post('/signin', userObj, function(data, err) {
    if (err) {
      alert('Incorrect username and/or password');
      throw (err);
    } else {
      redirect(URL + '/dashboard');
      return('Success: Status(200)');
    }
  });

}
