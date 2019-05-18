// Index constructor sets views to the app engine
const profile = require('./profile');
const appointments = require('./appointment');
const admin = require('./admin');
const data = require('../data');
const profileData = data.profiles;
const Handlebars = require('handlebars');
const map = require('./map');

async function isAdmin(req, res, next) {
	try {
		let user;
		if (req.session.userid) {
			user = await profileData.get(req.session.userid);
			if (user.isAdmin) {
				next();
				return;
			}
		}
		res.redirect('/profile/login');
	} catch (error) {
		res.status(400);
		res.send(error);
	}
}

const constructorMethod = (app) => {
	app.use("/profile", profile);
	app.use("/appointments", appointments);
	app.use("/admin", isAdmin, admin);
	app.use("/map", map);
	app.get("*", async (req, res) => {
		try {
			let user;
			if (req.session.userid) {
				user = await profileData.get(req.session.userid);
			}
			
			options = {
				layout: false,
				title: "Testing!",
				pageType: "login-page",
				user: user
			}
			res.render("pages/landing", options);
		} catch (error) {
			res.status(400);
			res.send(error);
		}
	});
};

// Exports our constructor
module.exports = constructorMethod;