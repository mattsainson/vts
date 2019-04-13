# VTS

Video Tutoring Scheduler
Project #2 UC Davis Coding Bootcamp
Developed by: Kate Burson, Matt Sainson, Marvin Tryon

Deployed: https://agile-earth-56750.herokuapp.com/
Repo: https://github.com/mattsainson/vts

You're a student, and you want to take advantage of tutoring services. You'd like to use a system that would allow you to find available tutors for your subject at the times you're available. If possible, it would be nice to setup a recurring session. The best format would be a video session.

You're a tutor, and you want to offer workshops for the subjects in which you're proficient, at the times that you're available. You want to specify a max number of students for the time you allotted so you have time to answer questions.

VTS is multi-user system allowing a student to request a video appointment with a tutor. The student sees their requests and appointments on their dashboard, and is able to create a request. The student can cancel a requested, and attend appointments.

When a student creates a request, the system matches the student based on the request date (name of day) and subject (fixed list), and the tutor's availability (day names) and subjects (list). The highest ranking tutor is auto-assigned to the request. Once matched, the system creates a corresponding appointment, attendee records for the student and the tutor, and links back to the request.

The tutor can specify their subject areas and their days of availability. The tutor can see their appointments, and the requests they have been matched to. The tutor can approve a request, which then creates the appointment. The tutor can reject a request. The tutor can initiate an appointment called a workshop. The system makes the tutor an attendee. Students can request to be an attendee to a workshop.

The app is a REST API with an HTML frontend.
The API doc can be found here: https://documenter.getpostman.com/view/6922515/S1ENxJUi
An example beginning mockup can be found here: 
https://xd.adobe.com/view/fc52d30c-b107-4863-7688-324bd0fffa3d-8a63/

To start, clone the repo.
Change your terminal path to the app directory.
Then in terminal: node server.js
From your browser: localhost:3000/ will redirect you to localhost:3000/login.
Click Sign up, and provide your email, name, and a password. You will be logged in when you sign up and redirected to the dashboard.
From here you have view your data, make requests, and edit your profile.

App Stack:

Backend: MySQL, Sequelize, Express
Frontend: Bootstrap, JS, jQuery, ajax, Font Awesome
Other libraries: moment, fs, path, mocha, chai, prettier, eslint