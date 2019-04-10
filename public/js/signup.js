
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
    isTutor: $('#isTutor').children('option:selected').val()
  };
  
  $.post('/signup', userObj, function(err, res) {
    if (err) {
      throw (err);
    } else {
      userObj.id = res.id;
      redirect('/dashboard.html');
      return('Success: Status(200)');
    }
  });

}
