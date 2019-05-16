// Router for profile actions / requests
const express = require("express")
const router = express.Router()
const appointmentsData = require('../data/appointments')

// Route to create an appointment
// router.get('/create', async (req, res) => {
// 	try {
// 		res.render("pages/appointments/createAppointment.hbs");
// 	} catch (error) {
// 		res.status(400);
// 		res.send(error);
// 	}
// })

router.post('/create', async (req, res) => {
	try {
		let newApt = {
			userId: req.body.userId,
			practitionerId: req.body.practitionerId,
			procedure: req.body.procedure,
			cost: req.body.cost,
			verification: false
		};
		let appointment = await appointmentsData.create(newApt);
		res.json(appointment);
	} catch (error) {
		res.status(400);
		res.send(error);
	}
})

module.exports = router