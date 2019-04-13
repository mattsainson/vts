$(document).ready(function() {
  
  var id = localStorage.getItem('id');

  // Get appointments
  $.get('/appointment/getappointments/' + id, function(data) {
    populateDashboard(data);
  });

  // Cancel a scheduled appointment
  $('#cancel-appt').on('click', function() {
    $.put('/appointment/cancelappointment/' + this.id);
  });

  // Cancel an appointment request
  $('cancel-request').on('click', function() {
    $.put('/request/cancelrequest/' + this.id);
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
    var $cancel = $('<button>');
    var $accept = $('<button>');
    if (appt.apptState === 'Scheduled') {
      $collapsible.attr('class', 'collapsible dashboard-item teal').text(appt.subject, appt.schedDateTime, appt.durationSchedMin);
      $status.text(appt.apptState);
      $tutor.text(data.tutorId);
      $description.text(appt.desc);
      $url.attr('href', '');
      $cancel.attr({'class': 'red'}, {'id':'cancel-appt'}).text('Cancel');
      $content.attr('class', 'content teal').append($status, $tutor, $description, $url, $cancel);
      $('#dashboard').append($collapsible, $content);
    } else if (appts[i].apptState === 'Canceled') {
      $collapsible.attr('collapsible dashboard-item red').text(appt.subject, appt.schedDateTime, appt.durationSchedMin);
      $status.text(appt.apptState);
      $tutor.text(data.requests.tutorId);
      $description.text(appt.desc);
      $content.attr('class', 'content red').append($status, $tutor, $description);
      $('#dashboard').append($collapsible, $content);
    } else if (appts[i].apptState === 'Complete') {
      $collapsible.attr('class', 'collapsible dashboard-item grey').text(appt.subject, appt.schedDateTime, appt.durationSchedMin);
      $status.text(appt.apptState);
      $tutor.text(data.requests.tutorId);
      $description.text(appt.desc);
      $url.attr('href', '');
      var $ratingForm = $('<form class="rating"><label><input type="radio" name="stars" value="1" /><span class="icon">★</span></label><label><input type="radio" name="stars" value="2" /><span class="icon">★</span><span class="icon">★</span></label><label><input type="radio" name="stars" value="3" /><span class="icon">★</span><span class="icon">★</span><span class="icon">★</span></label><label><input type="radio" name="stars" value="4" /><span class="icon">★</span><span class="icon">★</span><span class="icon">★</span><span class="icon">★</span></label><label><input type="radio" name="stars" value="5" /><span class="icon">★</span><span class="icon">★</span><span class="icon">★</span><span class="icon">★</span><span class="icon">★</span></label></form>');
      $content.attr('class', 'content grey').append($status, $tutor, $description, $url, $ratingForm);
      $('#dashboard').append($collapsible, $content);
    }
  }
  var requests = data.requests;
  for(var i = 0; i < requests.length; i++) {
    var request = requests[i];
    if (request.requestState === 'Pending') {
      $collapsible.attr('class', 'collapsible dashboard-item yellow').text(appt.subject, appt.schedDateTime, appt.durationSchedMin);
      $status.text(appt.apptState);
      $tutor.text(data.requests.tutorId);
      $description.text(appt.desc);
      $accept.attr({'class': 'teal'}, {'id':'accept-appt'}).text('Confirm');
      $cancel.attr({'class':'red'}, {'id':'cancel-request'}).text('Cancel');
      $content.attr('class', 'content yellow').append($status, $tutor, $description, $accept, $cancel);
      $('#dashboard').append($collapsible, $content);
    }
  }
}

// Collapsible on click
$('#dashboard').on('click', '.collapsible', function () {
  this.classList.toggle('active');
  var content = this.nextElementSibling;
  if (content.style.maxHeight){
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  } 
});

// JS for rating form
$(':radio').change(function() {
  console.log('New star rating: ' + this.value);
});