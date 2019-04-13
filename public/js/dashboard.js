$(document).ready(function() {
  
  var id = localStorage.getItem('id');

  // Get appointments
  $.get('/appointment/getappointments/' + id, function(data) {
    console.log(data);
    populateDashboard(data);
  });

  $.get('/request/getrequests/' + id, function(data) {
    console.log(data);
    populateDashboard(data);
  });

  // Cancel a scheduled appointment
  $('#dashboard').on('click', '#cancel-appt', function() {
    console.log('cancel clicked');
    $.put('/appointment/cancelappointment/' + this.id);
  });

  // Cancel an appointment request
  $('cancel-request').on('click', function() {
    console.log('cancel clicked');
    $.put('/request/cancelrequest/' + this.id);
  });

});

// Append uers's appointments to dashboard
function populateDashboard(data) {
  for(var i = 0; i < data.appointments.length; i++) {
    var appt = data.appointments[i];
    var $collapsible = $('<button>');
    var $content = $('<div>');
    var $status = $('<p>');
    var $tutor = $('<p>');
    var $description = $('<p>');
    var $url = $('<a>Appointment Video Link</a>');
    var $cancel = $('<button>');
    var $accept = $('<button>');
    if (appt.apptState === 'Scheduled') {
      $collapsible.attr('class', 'collapsible dashboard-item teal').text(appt.subject + ' ' + appt.schedDateTime + ' ' + appt.durationSchedMin + 'min');
      $cancel.attr({'class': 'red cancel'}, {'id':'cancel-appt'}).text('Cancel');
      $status.text('Status: ' + appt.apptState);
      $tutor.text('Tutor: ' + data.tutorId);
      $description.text('Description: ' + appt.desc);
      $url.attr('href', '');
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
  
  for(var i = 0; i < data.requests.length; i++) {
    var request = data.requests[i];
    if (request.requestState === 'Pending') {
      $collapsible.attr('class', 'collapsible dashboard-item yellow').text(appt.subject, appt.schedDateTime, appt.durationSchedMin);
      $status.text(appt.apptState);
      $tutor.text(data.requests.tutorId);
      $description.text(appt.desc);
      $accept.attr({'class': 'teal'}, {'id':'accept-appt'}).text('Confirm');
      $cancel.attr({'class':'red cancel'}, {'id':'cancel-request'}).text('Cancel');
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