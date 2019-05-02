const express = require("express");
const router = express.Router();
const {ObjectID} = require("mongodb");
const practitioners = require('../data/practitioners');

router.get('/', async (req, res) => {
    res.render('map/map.hbs', {layout: false});
});

router.get('/all', async(req, res) => {
    let allPractitioners;
    try {
        allPractitioners = await practitioners.getAll();
    } catch (e) {
        res.status(500);
        res.send(e);
        return;
    }
    res.send(allPractitioners)
})


module.exports = router;