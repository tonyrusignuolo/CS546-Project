// Router for profile actions / requests
const express = require("express")
const router = express.Router()
const appointmentsData = require('../data/appointments')

// 
router.get('/create-appointment', async (req, res) => {
	try {
		res.render("appointments/createAppointment.handlebars");
	} catch (error) {
		res.status(400);
		res.send(error);
	}
})

router.post('/create-appointment', async (req, res) => {
	try {
		const appointment = await appointmentsData.create(req.body)
		res.json(appointment);
	} catch (error) {
		res.status(400);
		res.send(error);
	}
})

module.exports = router