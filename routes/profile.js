// Router for profile actions / requests
const express = require("express")
const router = express.Router()
const data = require('../data')
const profileData = data.profiles
const bcrypt = require("bcrypt");

// New route for profile creation
router.get('/signup', async (req, res) => {
	try {
		let options = {

		}
		res.render("partials/pages/signup.hbs", options);
	} catch (error) {
		res.status(404);
		res.send(error);
	}
})

router.post('/signup', async (req, res) => {
    try{
		const newProfile = await profileData.create(req.body)
		res.redirect("/");
    }
    catch(eroor){
		res.status(400);
		res.send(error);
    }
})

router.get('/login', async (req, res) => {
	try {
		let options = {
		}
		res.render("partials/pages/login.hbs", options);
	} catch (error) {
		res.status(404);
		res.send(error);
	}
})

router.post('/login', async (req, res) => {
	// Test
	console.log("I really like trains")
	
	if(req.body.email === undefined || req.body.email === '' || req.body.password === undefined || req.body.password === ''){
		res.status(401).render("partials/pages/login.hbs", {error: "Please enter email and password"})
		return;
	}

	// See if the user email exists in the data base
	const user = await profileData.getbyEmail(req.body.email)
	if(user === null || user === undefined){
		res.status(401).render("partials/pages/login.hbs", {error: "Invalid email or password"})
		return;
	}

	// Compare the password input to the hashed password under the user to authenticate login
	let hashcmp = await bcrypt.compare(req.body.password, user.hashedPassword)

	if(hashcmp){
		console.log("SUCCESS LOGIN AUTHENTICATED")
		
		// Set the cookie 
		req.session.userid = user._id
		// REDIRECT TO PROFILE and CHANGE OPTIONS landing page etc.
		// Temp. Redirects home
		res.redirect("/");
	}
	else {
		res.status(401).render("partials/pages/login.hbs", {error: "Invalid email or password"})
		
	}

	return;
})

module.exports = router