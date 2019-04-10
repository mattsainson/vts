$(document).ready(function() {
  
  $('#request-appt').on('click', function() {
    newAppointment();
    $.post('/request/newrequest', function(newAppointment, err) {
      if (err) {
        throw (err);
      } else {
        return(newAppointment, 'Status: Success(200)');
      }
    });
  });

  $('#create-workshop').on('click', function() {
    newAppointment();
    $.post('/appointment/newappointment', function(newAppointment, err) {
      if (err) {
        throw (err);
      } else {
        return(newAppointment, 'Status: Success(200)');
      }
    });
  });

  function newAppointment() {
    var date = $('#date').val();
    var hour = $('#hour').children('option:selected').val();
    var minute = $('#minute').children('option:selected').val();
    var amPm = $('#am/pm').children('option:selected').val();
    var time = [hour, minute, amPm];
    var duration = $('#duration').children('option:selected').val();
    var subject = $('input[subject]:checked').val();
    var description = $('#description').val().trim();

    var newAppointment = {
      requesterId: userObj.id,
      requestDateTime: [date, time],
      durationMin: duration,
      subject: subject,
      desc: description
    };
    
    return newAppointment;
  }

});
