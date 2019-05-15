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
	try {
		req.body.password = await bcrypt.hash(req.body.password, 16);
		let newProfile = await profileData.create(req.body);
		// req.session.userid = newProfile._id;
		res.redirect("/login");
	}
	catch (error) {
		res.status(400);
		res.send(error);
	}
})

router.get('/login', async (req, res) => {
	try {
		let user;
		if (req.session.userid) {
			res.redirect("/");
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
	// Test
	

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
		res.redirect("/");
		
	}
	else {
		res.status(401).render("pages/login.hbs", { error: "Invalid email or password" });
	}

	return;
	// } catch (error) {
	// 	res.status(400);
	// 	res.send(error);
	//}
})

router.get('/', async (req, res) => {
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

module.exports = router