const express = require("express");
const router = express.Router();
const practitioners = require('../data/practitioners');
const profiles = require('../data/profiles');


router.get('/', async (req, res) => {
    //res.render('pages/map.hbs', {layout: false});
    let allPractitioners;
    try {
        allPractitioners = await practitioners.getAll();
    }
    
    catch (e) {
        res.status(500);
        res.send(e);
        return;
    }

    let insuranceList = []
    let procedureList = []

    // Get all practitioners and we extract all insurance providers and procedures to pass to the maps page
    // So we can populate the drop down menu's
    for(let i=0; i < allPractitioners.length; i++){
        for(let j=0; j < allPractitioners[i].procedures.length; j++){
            let zz = allPractitioners[i].procedures[j]
            for (let name in zz){
                if(!procedureList.includes(name)){
                    procedureList.push(name)
                }
            }
        }

        for(let j=0; j < allPractitioners[i].providers.length; j++){
            let zz = allPractitioners[i].providers[j]
            if(!insuranceList.includes(zz)){
                insuranceList.push(zz)
            }
        }
    }

    // Sets the options to populate the insurance and procedure dropdown
    let options = {
        layout: false,
        pageType: "dashboard-page",
        insurance: insuranceList,
        procedures: procedureList
    }

    res.render('pages/map.hbs', {options});
});

// Route for map matching to practitioner filter input
router.get('/match', async(req,res)=> {
    // Request from ajax data gets set in query
    let matchPractitioners
    try{
        matchPractitioners = await practitioners.getMatch(req.query.insurance, req.query.procedure)
    }
    catch(e){
        res.status(500);
        res.send(e);
        return;
    }
    // Sends the object back for new map markers
    res.send(matchPractitioners)
})

// Route for ajax request to get all practitioners
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