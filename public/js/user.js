
// Store user info for session
var id = localStorage.getItem('id');
var name = localStorage.getItem('name');
var isTutor = localStorage.getItem('isTutor');

 // App display is slightly different for students and tutors
if(isTutor === false) {
  $('div.tutor').hide();
}

// Add user name to nav bar
$('#user').text(name);

// Logout on click
$('#logout').on('click', function() {
  $.ajax({
    type: 'PUT',
    url: '/logout/' + id,
    success: function(data) {
      console.log(data);
      localStorage.clear();
      window.location.replace('/login');
    }
  });
});

