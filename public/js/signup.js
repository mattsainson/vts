
$('#signup').on('click', function () {
  event.preventDefault();
  console.log('signup clicked');
  signUp();
});

function signUp() {
  userObj = {
    name: $('#name').val().trim(),
    email: $('#email').val().trim(),
    password: $('#password').val().trim(),
    isTutor: $('#isTutor').children('option:selected').val()
  };
  $.post('/signup', userObj, function (res) {
    console.log(res);
    userObj.id = res.id;
    return userObj, window.location.replace('/dashboard.html');
  });
}
