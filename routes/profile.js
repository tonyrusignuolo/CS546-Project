// Router for profile actions / requests
const express = require("express");
const router = express.Router();
const data = require('../data');
const profileData = data.profiles;
const bcrypt = require("bcrypt");

// New route for profile creation
router.get('/signup', async (req, res) => {
	try {
		let options = {
			layout: false
		};
		res.render("pages/signup.hbs", options);
	} catch (error) {
		res.status(404);
		res.send(error);
	}
})

router.post('/signup', async (req, res) => {
	// Check fields are filled out correctly
	if (req.body.email === undefined || req.body.email === '' || req.body.password === undefined || req.body.password === '' || req.body.firstName === undefined || req.body.firstName === '' || req.body.lastName === undefined || req.body.lastName === '') {
		res.status(401).render("pages/signup.hbs", { error: "Error: Missing fields" })
		return;
	}

	// See if the user email exists in the data base
	let user = await profileData.getbyEmail(req.body.email)
	if (user !== null) {
		res.status(401).render("pages/signup.hbs", { error: "Error: That email is already in use." })
		return;
	}

	// Error for non-matching passwords on sign up
	if(req.body.password !== req.body.passwordconfirm){
		res.status(401).render("pages/signup.hbs", { error: "Error: Passwords dont match." })
		return;
	}

	// Creates the new object to be stored into the DB
	req.body.password = await bcrypt.hash(req.body.password, 16);
	req.body.firstName = req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1);
	req.body.lastName = req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1);
	let newbody = {
		email: req.body.email,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		isAdmin: false,
		insuranceProvider: req.body.insuranceProvider
	}
	let newProfile = await profileData.create(newbody);
	req.session.userid = newProfile._id
	res.redirect("/")
	
})

router.get('/login', async (req, res) => {
	try {
		let user;
		if (req.session.userid) {
			res.redirect("/");
			return;
		}
		else {
			let options = {
				layout: false
			}
			res.render("pages/login.hbs", options);
		}
	} catch (error) {
		res.status(404);
		res.send(error);
	}
})

router.post('/login', async (req, res) => {
	
	if (req.body.email === undefined || req.body.email === '' || req.body.password === undefined || req.body.password === '') {
		res.status(401).render("pages/login.hbs", { error: "Please enter email and password" })
		return;
	}

	// See if the user email exists in the data base
	let user = await profileData.getbyEmail(req.body.email)
	if (user === null || user === undefined) {
		res.status(401).render("pages/login.hbs", { error: "Invalid email or password" })
		return;
	}

	// Compare the password input to the hashed password under the user to authenticate login
	let hashcmp = await bcrypt.compare(req.body.password, user.password);
	

	if (hashcmp) {
		// Set the cookie 
		req.session.userid = user._id
		res.redirect("/profile");
		return;
	}
	else {
		res.status(401).render("pages/login.hbs", { error: "Invalid email or password" });
	}
	return;
	
})

router.get('/', async (req, res) => {
	// When there is no session, redirect to login
	if(!req.session.userid){
		res.redirect("profile/login")
		return;
	}

	try {
		let user;
		if (req.session.userid) {
			user = await profileData.get(req.session.userid);
		}
		options = {
			layout: false,
			title: "User",
			pageType: "profile-page",
			user: user
		}
		res.render("pages/profile", options);
	} catch (error) {
		res.status(400);
		res.send(error);
	}
})

// New route for profile creation
router.get('/logout', async (req, res) => {
	res.clearCookie("AuthCookie")
	res.redirect("/")
	return;
})

module.exports = router