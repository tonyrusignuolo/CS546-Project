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

|email|password|admin|
|-----|--------|-------|
|`lieutenant_dan@gmail.com`|`iaintgotnolegs`|`yes`|
|`jaime_lannister@yahoo.com`|`lionheart`|`no`|
|`pbaressi@stevens.edu`|`dangernoodle`|`yes`|
