# vts

Video tutoring scheduler

A multi-user system allowing a student to request a video appointment with a tutor. The student can specify their schedule constraints with days/time as well as preferred tutor sex (M/F). The student sees their schedule with confirmed appointments, and is able to initiate an appointment at it's scheduled time. The student can cancel a requested, scheduled appointment.

The tutor's profile includes their schedule constraints as well as their sex (M/F). The tutor accepts or rejects schedule requests. The tutor can see their schedule with proposed and scheduled appointments. The tutor can initiate an appointment at it's scheduled time.

The system matches up the student and the tutor based on all the constraints.
The system keeps track of appointment duration (video duration).

Developers: Kate Burson, Marvin Tryon, Matt Sainson

App Stack:

Backend: MySQL, Sequelize (mysql2), Express
Frontend: Bootstrap, JS, jQuery, ajax

APIs: Twilio or Tokbox

Other libraries: moment, fs, path, 
