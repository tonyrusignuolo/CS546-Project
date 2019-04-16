const express = require("express");
const router = express.Router();
const practitioners = require('../data/practitioners');

router.get('/practitioners/create', async (req, res) => {
    try {
        res.render("admin/practitioners/create.handlebars");
    } catch (error) {
        res.status(400);
        res.send(error);
    }
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
    res.send({id: id});
});

module.exports = router;