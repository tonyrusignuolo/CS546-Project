// Index constructor sets views to the app engine
const profile = require('./profile')
const appointments = require('./appointments')

const constructorMethod = (app) => {
	app.use("/profile", profile)
	app.use("/appointments", appointments)
	app.use("*", (req, res) => {
		res.sendStatus(404);
	})
}

// Exports our constructor
module.exports = constructorMethod