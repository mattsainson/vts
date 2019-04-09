var userObj = require('userObj');

var URL = 'https://agile-earth-56750.herokuapp.com/';

$.get(URL + '/profile/getprofile/:userid', function(data, err) {
  if (err) {
    throw (err);
  } else {
    populateProfile(data);
  }
});

function populateProfile(data) {
  var name = data.name;
  var role = data.isTutor;
  var email = data.email;
  var subjects = data.tutorConstraints.subjects;
  var availability = data.tutorConstraints.available;
  var rating = data.rank;
  var memberSince = data.createdAt;

  $('#name').text(name);
  $('#role').text(role);
  $('#email').text(email);
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
 
  var URL = 'https://agile-earth-56750.herokuapp.com/';
  
  $.put(URL + '/profile/updateprofile/:userid', userObj, function(data, err) {
    if (err) {
      alert('Incorrect username and/or password');
      throw (err);
    } else {
      redirect(URL + 'profile.html');
      return('Success: Status(200)');
    }
  });
}
