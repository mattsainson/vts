

$(document).ready(function() {

  var id = localStorage.getItem('id');
  
  $('#request-appt').on('click', function () {
    console.log('clicked');
    var date = $('#date').val();
    var hour = $('#hour').children('option:selected').val();
    var minute = $('#minute').children('option:selected').val();

    var amPm = $('#amPm').children('option:selected').val();
    //if PM, then add 12 to the hour to get military time
    if (amPm === 'pm') {
      hour = parseInt(hour) + 12;
    }
    //add seconds to time string
    var time = hour + ':' + minute + ':00';
    var dateTime = [date + 'T' + time];
    var duration = $('#duration').children('option:selected').val();

    var subject = $("input[name='subject']:checked").val();
  
    var description = $('#description').val().trim();

    var newAppointment = {
      'requesterId': id,
      'requestDateTime': dateTime,
      'durationMin': duration,
      'subject': subject,
      'desc': description
    };

    // var newAppt = JSON.stringify(newAppointment);
    // console.log(newAppt);

    console.log(newAppointment);

    $.post('/request/newrequest', newAppointment, function(data) {
      console.log(data);
      console.log('appointment requested');
      $('#success').attr('class', 'red dashboard-item').text('Appointment Requested');
      // window.location.replace('/dashboard.html'); 
      // }
    });
  });

  $('#create-workshop').on('click', function() {
    var date = $('#date').val();
    var hour = $('#hour').children('option:selected').val();
    var minute = $('#minute').children('option:selected').val();
    var amPm = $('#amPm').children('option:selected').val();
    var time = hour+ ':' + minute + amPm;
    var dateTime = [date + '' + time ];
    var duration = $('#duration').children('option:selected').val();

    var subject = $("input[name='subject']:checked").val();
    
    var description = $('#description').val().trim();

    var newAppointment = {
      'requesterId': id,
      'requestDateTime': dateTime,
      'durationMin': duration,
      'subject': subject,
      'desc': description
    };

    var newAppt = JSON.stringify(newAppointment);
    console.log(newAppt);

    $.post('/appointment/newappointment', newAppot, function (data) {
      if (err) {
        throw (err);
      } else {
        return(data);
      }
    });
  });

});
