$(document).ready(function() {
  
  $('#request-appt').on('click', function() {
    newAppointment();
    $.post('/request/newrequest', newAppointment, function(data) {
      console.log(data);
      console.log('appointment requested');
      $('#success').attr('class', 'red dashboard-item').text('Appointment Requested');
      window.location.replace('/dashboard.html'); 
      // }
    });
  });

  $('#create-workshop').on('click', function() {
    newAppointment();
    $.post('/appointment/newappointment', newAppointment, function (data) {
      if (err) {
        throw (err);
      } else {
        return(data);
      }
    });
  });

  // var moment = require('moment');
  // moment().format();

  function newAppointment() {
    // var date = moment.format($('#date').val(), 'YYYY-MM-DD');
    // var hour = $('#hour').children('option:selected').val();
    // var minute = $('#minute').children('option:selected').val();
    // var amPm = $('#am/pm').children('option:selected').val();
    // var time = moment.format(hour+ ':' + minute + amPm, 'HH:MM');
    var dateTime = [date + '' + time ];
    var duration = $('#duration').children('option:selected').val();
    var subject = $('input[subject]:checked').val();
    var description = $('#description').val().trim();

    var newAppointment = {
      requesterId: userObj.id,
      requestDateTime: dateTime,
      durationMin: duration,
      subject: subject,
      desc: description
    };
    
    return newAppointment;
  }

});
