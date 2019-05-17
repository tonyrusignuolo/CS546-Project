// Router for profile actions / requests
const express = require("express")
const router = express.Router()
const appointmentsData = require('../data/appointments')

// Create an appointment
router.post('/create', async (req, res) => {
	console.log(req.body)
	return;
	
	try {
		let newApt = {
		};
		let appointment = await appointmentsData.create(newApt);
		res.json(appointment);
	} catch (error) {
		res.status(400);
		res.send(error);
	}
})

module.exports = router