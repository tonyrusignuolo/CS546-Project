const express = require("express");
const router = express.Router();
const practitioners = require('../data/practitioners');
const {ObjectID} = require("mongodb");

router.get('/practitioners', async (req, res) => {
    let allPractitioners;
    try {
        allPractitioners = await practitioners.getAll();
    } catch (e) {
        res.status(500);
        res.send(e);
        return;
    }

    res.render('admin/practitioners/index.hbs',
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

module.exports = router;