// Store user info for session


var userObj = {
  id: 0,
  name: '',
  email: '',
  isTutor: true
};

 // App display is slightly different for students and tutors
if(userObj.isTutor === false) {
  $('.tutor').hide();
}

// Logout on click
$('#logout').on('click', function() {
  logout();
});

// Logout function
function logout() {
  $.put('/logout/' + userObj.id, function(err) {
    if (err) {
      throw (err);
    } else {
      redirect('/login.html');
      return('Success: Status(200)');
    }
  }).then(function() {
    userObj = {
      id: 0,
      name: '',
      email: '',
      isTutor: true
    };
  });
}