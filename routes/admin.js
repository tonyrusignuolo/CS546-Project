const express = require("express");
const router = express.Router();
const practitioners = require('../data/practitioners');
const profiles = require('../data/profiles');
const appointments = require('../data/appointments');
const bcrypt = require("bcrypt");
const {ObjectID} = require("mongodb");

// Start Practitioners
router.get("/main", async (req, res) => {
	try {
		let allPractitioners;
		let allProfiles;
		let allAppointments;	
		let user = await profiles.get(req.session.userid);
		allPractitioners = await practitioners.getAll();
        allProfiles = await profiles.getAll();
		// allAppointments = await appointments.getAll();
		let options = {
			layout: false,
			title: "Admin",
			pageType: "profile-page",
			user: user
			// appointments: allAppointments,
			// practitioners: allPractitioners,
			// profiles: allProfiles
		};
		res.render("pages/admin/admin.hbs", options);
	} catch (error) {
		res.status(400);
		console.log(error);
		res.send(error);
	}
});

router.get('/practitioners', async (req, res) => {
    let allPractitioners;
    try {
        allPractitioners = await practitioners.getAll();
    } catch (e) {
        res.status(500);
        res.send(e);
        return;
    }

    res.render('pages/admin/practitioners/index.hbs',
        {
            layout: false,
            practitioners: allPractitioners
        });
});

router.post('/practitioners/create', async (req, res) => {
    let id;
    try {
        id = await practitioners.create(req.body);
    } catch (e) {
        res.status(400);
        res.send({error: e});
        return;
    }

    res.status(200);
    res.send({result: 'success', id: id});
});

router.post('/practitioners/update', async (req, res) => {
    try {
        await practitioners.update(ObjectID(req.body._id), req.body.update_);
    } catch (e) {
        res.status(400);
        res.send({error: e});
        return;
    }

    res.status(200);
    res.send({result: 'success'});
});

router.post('/practitioners/delete', async (req, res) => {
    try {
        await practitioners.remove(ObjectID(req.body._id));
    } catch (e) {
        res.status(400);
        res.send({error: e});
        return;
    }

    res.status(200);
    res.send({result: 'success'});
});
// End Practitioners

// Start Profiles
router.get('/profiles', async (req, res) => {
    let allProfiles;
    try {
        allProfiles = await profiles.getAll();
    } catch (e) {
        res.status(500);
        res.send(e);
        return;
    }

    res.render('pages/admin/profiles/index.hbs',
        {
            layout: false,
            profiles: allProfiles
        });
});

router.post('/profiles/create', async (req, res) => {
    let id;
    try {
        req.body.password = await bcrypt.hash(req.body.password, 16);
        id = await profiles.create(req.body);
    } catch (e) {
        res.status(400);
        res.send({error: e});
        return;
    }

    res.status(200);
    res.send({result: 'success', id: id});
});

router.post('/profiles/update', async (req, res) => {
    try {
        if (req.body.update_['$set'].password) {
            req.body.update_['$set'].password = await bcrypt.hash(req.body.update_['$set'].password, 16);
        }
        await profiles.update(ObjectID(req.body._id), req.body.update_);
    } catch (e) {
        res.status(400);
        res.send({error: e});
        return;
    }

    res.status(200);
    res.send({result: 'success'});
});

router.post('/profiles/delete', async (req, res) => {
    try {
        await profiles.remove(ObjectID(req.body._id));
    } catch (e) {
        res.status(400);
        res.send({error: e});
        return;
    }

    res.status(200);
    res.send({result: 'success'});
});
// End Profiles

// Start Appointments
router.get('/appointments', async (req, res) => {
    let allAppointments;
    try {
        allAppointments = await appointments.readAll();
    } catch (e) {
        res.status(500);
        res.send(e);
        return;
    }

    res.render('pages/admin/appointments/index.hbs',
        {
            layout: false,
            profiles: allAppointments
        });
});

router.post('/appointments/update', async (req, res) => {
    try {
        await appointments.update(ObjectID(req.body._id), req.body.update_);
    } catch (e) {
        res.status(400);
        res.send({error: e});
        return;
    }

    res.status(200);
    res.send({result: 'success'});
});

router.post('/appointments/delete', async (req, res) => {
    try {
        await appointments.delete(ObjectID(req.body._id));
    } catch (e) {
        res.status(400);
        res.send({error: e});
        return;
    }

    res.status(200);
    res.send({result: 'success'});
});
// End Appointments

module.exports = router;