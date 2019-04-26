// Index constructor sets views to the app engine
const profile = require('./profile');
const appointments = require('./appointments');
const admin = require('./admin');
const Handlebars = require('handlebars');
const map = require('./map');

const constructorMethod = (app) => {
	app.use("/profile", profile);
	app.use("/appointments", appointments);
	app.use("/admin", admin);
	app.use("/map", map);
	app.get("*", (req, res) => {
		// res.sendStatus(404);
		try {
			// user = {
			// 	role: 2,
			// 	firstName: "Anthony"
			// }
			options = {
				title: "Testing!",
				pageType: "dashboard-page"
				// user: user
			}
			res.render("partials/pages/landing.hbs", options);
		} catch (error) {
			res.status(400);
			res.send(error);
		}
	})
};

// Exports our constructor
module.exports = constructorMethod;