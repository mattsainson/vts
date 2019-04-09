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