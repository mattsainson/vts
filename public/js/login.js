$(document).ready(function() {

$('#login').on('click', function() {
  event.preventDefault();
  login();
});

function login() {
  userObj = {
    email : $('#email').val().trim(),
    password : $('#password').val().trim()
  };

  $.post('/signin', userObj, function(data) {
    console.log(data);
    userObj.id = data.id;
    localStorage.setItem('id', userObj.id);
    window.setTimeout(window.location.replace('/dashboard.html'), userObj, 10000); 
  });

  // $.post('/signin', userObj, function(err, data) {
  //   if (err) {
  //     $('#err').attr('class', 'red dashboard-item').text('Incorrect username/password 🙄');
  //     throw (err);
  //   } else if (data) {
  //     console.log(data);
  //     userObj.id = data.id;
  //     window.setTimeout(redirect('/dashboard.html'), 10000); 
  //   }
  // });
}

});