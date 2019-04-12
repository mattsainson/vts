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
      $collapsible.attr('class', 'teal');
      $collapsible.text(appt.subject, appt.schedDateTime, appt.durationSchedMin);
      $status.text(appt.apptState);
      $tutor.text(data.requests.tutorId);
      $description.text(appt.desc);
      $url.attr('href', '');
      $cancel.attr({'class': 'red'}, {'id':'cancel-appt'}).text('Cancel');
      $content.append($status, $tutor, $description, $url, $cancel);
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
      var $ratingForm = $('<form class="rating"><label><input type="radio" name="stars" value="1" /><span class="icon">★</span></label><label><input type="radio" name="stars" value="2" /><span class="icon">★</span><span class="icon">★</span></label><label><input type="radio" name="stars" value="3" /><span class="icon">★</span><span class="icon">★</span><span class="icon">★</span></label><label><input type="radio" name="stars" value="4" /><span class="icon">★</span><span class="icon">★</span><span class="icon">★</span><span class="icon">★</span></label><label><input type="radio" name="stars" value="5" /><span class="icon">★</span><span class="icon">★</span><span class="icon">★</span><span class="icon">★</span><span class="icon">★</span></label></form>');
      $content.append($status, $tutor, $description, $url, $ratingForm);
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
      $accept.attr({'class': 'teal'}, {'id':'accept-appt'}).text('Confirm');
      $cancel.attr({'class':'red'}, {'id':'cancel-request'}).text('Cancel');
      $content.append($status, $tutor, $description, $accept, $cancel);
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

// JS for rating form
$(':radio').change(function() {
  console.log('New star rating: ' + this.value);
});