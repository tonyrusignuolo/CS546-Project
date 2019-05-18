# Project Heartbeat

### Overview

When visiting the site, users will be taken to a landing page where they can sign in or sign up. After signing in they will be taken to their profile page where they can access the map page and book new appointments. After booking appointments they can see their appointments on their profile page. Admins can additionally access the admin panel where they can modify profiles, appointments, and practitioners.

### Running

First, start your MongoDB server and ensure that `config/mongoConnection.js` is configured properly. Then run the following commands:

```js
npm install
npm run seed
npm start
```

### Profiles

Here are several profiles included which can be used to test the site:

|email						|password			|admin	|
|---------------------------|-------------------|-------|
|`lieutenant_dan@gmail.com`	|`iaintgotnolegs`	|`yes`	|
|`jaime_lannister@yahoo.com`|`lionheart`		|`no`	|
|`pbaressi@stevens.edu`		|`dangernoodle`		|`yes`	|

### External Sources
If you like the design of the project, you can find the material-kit we used for the front end by Creative Tim in the link here:
https://demos.creative-tim.com/material-kit/index.html

This material-kit provides assets that design and style html with some animation and a friendly user interface and color pattern.

The health map was generated using the google maps javascript API which can be found here:
https://developers.google.com/maps/documentation/javascript/tutorial

### References
Regarding the design layout, the inspiration came from the following link:
https://cloudfour.com/thinks/the-hidden-power-of-handlebars-partials/

### General Structure
## Routes
The routes folder contains all of the routes that our project uses.
# ./routes/admin.js
This route contains the routes for the /admin/ section of our profile

A get route at /admin/main for fetching all of the data from the entire data base in /data/practitioners, /data/appointments and /data/profiles folder

Get /admin/profile/:email, which gets a profile by email from /data/profiles

Post /admin/profile/create that uses the /data/profiles.create method to create a profile

Post /admin/profile/edit that uses /data/profiles.update method to update a user profile

Get /admin/profile/delete:id which uses /data/profiles.remove method to remove a profile from the data base

Get /admin/practitioner/:practitionerId which uses /data/practitioners.get to get a practioner from collection

Post /admin/practitioner/create which uses /data/practitioners.create to create a new practitioner

Post /admin/practitioner/edit which uses /data/practitioners.update to update a practitioner

Get /admin/practitioner/delete/:id which uses /data/practitioners.remove to remove practitioner

Get /admin/appointment/:appointmentId which uses /data/appointments.read to get an appointment from db

Post /admin/appointment/create which uses /data/appointments.create to create an appointment to db

Post /admin/appointment/edi which uses /data/appointments.update to update an appointment

Get /admin/appointment/delete/:id which uses /data/appointments.delete to delete an appointment from db

Get /admin/practitioners which gets all practitioners from db through /data/practitioners.getAll

Post /admin/pracitioners/create which creates a new practitioner in db through /data/practitioners.create

Post /admin/practitioners/update to update practitioner in db through /data/practitioners.update

Post /admin/practitioners/delete to delete practitoner in db through /data/pracititoners.remove

Get /admin/profiles to get all profiles from db through /data/profiles.getAll

Post /admin/profiles/create to create a profile in DB through /data/profile.create

Post /admin/profiles/update to update profile in DB through /data/profile.update

Post /admin/profiles/delete to delete profile from DB through /data/profile.remove

Get /admn/appointments which uses /data/appointments.readall to get all appointments from db

Post /admin/appointments/update to update appointment in db through /data/appoointments.update

Post /admin/appointments/delete to delete appointment from db through /data/appointments.delete

# ./routes/appointments.js

Appointment route for non-admin appointment creation

Post /appointments/create to create an appointment in the db

# ./routes/map.js

Get /map which is the route to get all practitioners in DB and load the markers onto the map

Get /map/match which is used by the healthmap.js client side jquery via ajax call to get the matching practitioners for the map marker filtering

Get /map/all which his used by the healthmap.js client side jquery via ajax call to get all practitoners from the DB for the map markers on the map

Get /map/checklogin which is used by the healthmap.js client side jquery via ajax call to check the users login state and authentication on the request.session middleware

# ./routes/profile.js

Get /profile/signup is the route to get and render the sign up page

Post /profile/signup which is the route to post to the signup page and create a new profile in the db on success

Get /profile/login which is the route to get and render the login page

Post /profile/login which is the route to post to the login page and authenticate the users login

Get /profile which is the route used to render the profile page 

Post /profile/edit which is the route used to edit the logged in user profile

Get /profile/logout logs the user out and destroys the session authentication

