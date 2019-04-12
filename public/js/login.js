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
    localStorage.setItem('id', data.id);
    localStorage.setItem('name', data.name);
    localStorage.setItem('isTutor', data.isTutor);
    window.location.replace('/dashboard.html'); 
  });
}

});