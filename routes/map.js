const express = require("express");
const router = express.Router();
const {ObjectID} = require("mongodb");

router.get('/', async (req, res) => {
    res.render('map/map.hbs', {layout: false});
});

module.exports = router;