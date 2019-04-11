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
    // window.location.replace('/dashboard.html'); 
  });

  $.get('/profile/getprofile/' + userObj.id, function(data) {
    
  });
}

});