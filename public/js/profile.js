var id = localStorage.getItem('id');

$('#user').text(userObj.name);

$.get('/profile/getprofile/' + id, function(data) {
  populateProfile(data);
});

function populateProfile(data) {
  var name = data.name;
  var role = data.isTutor;
  var email = data.email;
  var password = data.password;
  var subjects = data.tutorConstraints.subjects;
  var availability = data.tutorConstraints.available;
  var rating = data.rank;
  var memberSince = data.createdAt;

  $('#name').text(name);
  $('#name').attr('placeholder', name);
  $('#role').text(role);
  $('#email').text('Email: ' + email);
  $('#email').attr('placeholder', email);
  $('#password').text('Password: ' + password);
  $('#password').attr('placeholder', password);
  $('#availability').text(availability);
  $('#subjects').text(subjects);
  $('#rating').text(rating);
  $('#member-since').text(memberSince);
}

$('#save').on('click', function() {
  event.preventDefault();
  editProfile();
});

function editProfile() {
  userObj = {
    name : $('#name').val().trim(),
    email : $('#email').val().trim(),
    password : $('#password').val().trim(),
    isTutor: $('#isTutor').children('option:selected').val(),
    tutorConstraints: {
      subject: [
        $('input[subject1]:checked').val(),
        $('input[subject2]:checked').val(),
        $('input[subject3]:checked').val(),
        $('input[subject4]:checked').val(),
      ],
      availability: [
        $('input[availability1]:checked').val(),
        $('input[availability2]:checked').val(),
        $('input[availability3]:checked').val(),
        $('input[availability4]:checked').val(),
        $('input[availability5]:checked').val(),
        $('input[availability6]:checked').val(),
        $('input[availability7]:checked').val(),
      ]
    } 
  };
  
  $.put('/profile/updateprofile/' + id, userObj, function(data, err) {
    if (err) {
      alert('Incorrect username and/or password');
      throw (err);
    } else {
      redirect('profile.html');
      return('Success: Status(200)');
    }
  });

}