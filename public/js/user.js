// Store user info for session
var id = localStorage.getItem('id');
var name = localStorage.getItem('name');
var isTutor = localStorage.getItem('isTutor');

 // App display is slightly different for students and tutors
if(isTutor === false) {
  $('.tutor').hide();
}

// Add user name to nav bar
$('#user').text(name);

// Logout on click
$('#logout').on('click', function() {
  localStorage.clear();
  $.put('/logout/' + id);
});

