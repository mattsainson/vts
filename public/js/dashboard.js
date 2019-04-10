$(document).ready(function() {

  var userObj = require('userObj');

  // Get UserId and customize page for user
  $.get('/profile/getprofile/:userid', function(data, err) {
    if (err) {
      throw (err);
    } else {
      return('Success: Status(200)', data);
    }
  }).then(function(data) {
    userObj.id = data.id;
    userObj.name = data.name;
    $('#user').text(userObj.name);
  });

  // Get appointments
  $.get('/appts/getappointments/' + userObj.id, function(data, err) {
    if (err) {
      throw (err);
    } else {
      populateDashboard(data);
    }
  });

  // Cancel a scheduled appointment
  $('#cancel-appt').on('click', function() {
    $.put('/appointment/cancelappointment/:apptid', function(data, err) {
      if (err) {
        throw (err);
      } else {
        return('Success: Status(200)');
      }
    });
  });

  // Cancel an appointment request
  $('cancel-request').on('click', function() {
    $.put('/request/cancelrequest/:requestid', function(data, err) {
      if (err) {
        throw (err);
      } else {
        return('Success: Status(200)');
      }
    });
  });

});

// Append uers's appointments to dashboard
function populateDashboard(data) {
  var appts = data.appointments;
  for(var i = 0; i < appts.length; i++) {
    var appt = appts[i];
    var $collapsible = $('<button class="collapsible dashboard-item">');
    var $content = $('<div class="content">');
    var $status = $('<p class="dropdown-item">');
    var $tutor = $('<p class="dropdown-item">');
    var $description = $('<p class="dropdown-item">');
    var $url = $('<a class="dropdown-item">Appointment Video Link</a>');
    var $button = $('<button>');
    if (appt.apptState === 'Scheduled') {
      $collapsible.attr('class', 'teal');
      $collapsible.text(appt.subject, appt.schedDateTime, appt.durationSchedMin);
      $status.text(appt.apptState);
      $tutor.text(data.requests.tutorId);
      $description.text(appt.desc);
      $url.attr('href', '');
      $button.attr({'class': 'red'}, {'id':'cancel-appt'}).text('Cancel');
      $content.append($status, $tutor, $description, $url, $button);
      $collapsible.append($content);
      $('#dashboard').append($dropdown);
    } else if (appts[i].apptState === 'Canceled') {
      $collapsible.attr('class', 'red');
      $collapsible.text(appt.subject, appt.schedDateTime, appt.durationSchedMin);
      $status.text(appt.apptState);
      $tutor.text(data.requests.tutorId);
      $description.text(appt.desc);
      $content.append($status, $tutor, $description);
      $collapsible.append($content);
    } else if (appts[i].apptState === 'Complete') {
      $collapsible.attr('class', 'grey');
      $collapsible.text(appt.subject, appt.schedDateTime, appt.durationSchedMin);
      $status.text(appt.apptState);
      $tutor.text(data.requests.tutorId);
      $description.text(appt.desc);
      $url.attr('href', '');
      // create rating entry form here
      $content.append($status, $tutor, $description, $url);
      $collapsible.append($content);
    }
  }
  var requests = data.requests;
  for(var i = 0; i < requests.length; i++) {
    var request = requests[i];
    if (request.requestState === 'Pending') {
      $collapsible.attr('class', 'yellow');
      $collapsible.text(appt.subject, appt.schedDateTime, appt.durationSchedMin);
      $status.text(appt.apptState);
      $tutor.text(data.requests.tutorId);
      $description.text(appt.desc);
      $button.attr({'class':'red'}, {'id':'cancel-request'}).text('Cancel');
      $content.append($status, $tutor, $description, $button);
      $collapsible.append($content);
    }
  }
}

// JS for collapsible dashboard items
var coll = $('.collapsible');
for (var i = 0; i < coll.length; i++) {
  coll.on('click', function() {
    this.classList.toggle('active');
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}