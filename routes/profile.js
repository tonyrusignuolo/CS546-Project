// Router for profile actions / requests
const express = require("express")
const router = express.Router()
const data = require('../data')
const profileData = data.profiles

router.get('/create-profile', async (req, res) => {
	res.render("profile/createprofile.handlebars")
})

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

module.exports = router