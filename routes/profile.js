// Router for profile actions / requests
const express = require("express")
const router = express.Router()
const data = require('../data')
const profileData = data.profiles

router.get('/create-profile', async (req, res) => {
    res.render("profile/createprofile.handlebars")
})

router.post('/create-profile', async (req, res) => {
    try{
        const newProfile = await profileData.createProf(req.body)
    }
    catch(e){
        console.log(e)
        return
    }
})

module.exports = router