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
    userObj.name = data.name;
    localStorage.setItem('id', userObj.id);
    localStorage.setItem('name', userObj.name);
    window.location.replace('/dashboard.html'); 
  });
}

});