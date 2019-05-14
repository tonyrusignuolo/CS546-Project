const express = require("express");
const router = express.Router();
const practitioners = require('../data/practitioners');


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
        insurance: insuranceList,
        procedures: procedureList
    }  
    

    res.render('pages/map.hbs', {options});
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