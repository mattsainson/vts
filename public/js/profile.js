var id = localStorage.getItem("id");

$.get("/profile/getprofile/" + id, function(data) {
  populateProfile(data);
});

function populateProfile(data) {
  console.log(data);

  var name = data.name;
  $("#name").text(name);
  $("#name").val(name);

  var role = data.isTutor;
  if (role === false) {
    $("#role").text("Student");
  } else {
    $("#role").text("Tutor");
  }

  var email = data.email;
  $("#email").text("Email: " + email);
  $("#email").val(email);

  var password = data.password;
  $("#password").text("Password: " + password);
  $("#password").val(password);

  var availability = data.tutorConstraints;
  $("#availability").text("Availability: " + availability);

  var subjects = data.tutorConstraints;
  $("#subjects").text("Subjects: " + subjects);

  var rating = data.rank;
  $("#rating").text("Rating: " + rating);

  var memberSince = data.createdAt;
  $("#member-since").text("Member Since: " + memberSince);
}

$("#save").on("click", function() {
  event.preventDefault();
  editProfile();
});

function editProfile() {
  var subjects = [];
  $.each($("input[name='subject[]']:checked"), function() {
    subjects.push($(this).val());
    // or you can do something to the actual checked checkboxes by working directly with  'this'
    // something like $(this).hide() (only something useful, probably) :P
  });
  console.log('subjects',subjects);

  var available = [];
  $.each($("input[name='available[]']:checked"), function() {
    available.push($(this).val());
    // or you can do something to the actual checked checkboxes by working directly with  'this'
    // something like $(this).hide() (only something useful, probably) :P
  });
  console.log('available', available);

  console.log("profile saved");
  var tcObj = {
    'subjects': subjects,
    'available': available
  };
  var tutorConstraints = JSON.stringify(tcObj);

  var userObj = {
    name: $("#name")
      .val()
      .trim(),
    email: $("#email")
      .val()
      .trim(),
    password: $("#password")
      .val()
      .trim(),
    isTutor: $("#isTutor")
      .children("option:selected")
      .val(),
    tutorConstraints: tutorConstraints
  };

  console.log(userObj);

  $.ajax({
    method: "PUT",
    url: "/profile/updateprofile/" + id,
    data: userObj,
    // success: function(data) {
    // console.log('data being received',data);
    // }
  // eslint-disable-next-line no-unused-vars
  }).then(function(res) {
    window.location.replace('/profile');
  });
}
