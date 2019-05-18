// Seeds profiles data
const conn = require('../../config/mongoConnection');
const profiles = require('../profiles');
const practitioners = require('../practitioners');
const appointments = require('../appointments');

// Salt rounds for passwords and authentication
const bcrypt = require("bcrypt");
const saltRounds = 16;

const main = async () => {
    // Removes all current profiles from DB

    await profiles.removeAll();

    // Secret password for profile 1
    let prof1password = "iaintgotnolegs";
    let prof1hash = await bcrypt.hash(prof1password, saltRounds);

    let prof1;
    if(await bcrypt.compare(prof1password, prof1hash)){
        prof1 = await profiles.create({
            email: "lieutenant_dan@gmail.com",
            password: prof1hash,
            firstName: "Lieutenant",
            lastName: "Dan",
            isAdmin: true,
            insuranceProvider: "Delta",
            photo: "/assets/img/Stevens/lut_dan.jpg"
        });
    }

    let prof2password = "lionheart";
    let prof2hash = await bcrypt.hash(prof2password, saltRounds);

    let prof2;
    if(await bcrypt.compare(prof2password, prof2hash)){
        prof2 = await profiles.create({
            email: "jaime_lannister@yahoo.com",
            password: prof2hash,
            firstName: "Jaime",
            lastName: "Lannister",
            isAdmin: false,
            insuranceProvider: "Blue Cross"
        });
    }

    let prof3password = "dangernoodle";
    let prof3hash = await bcrypt.hash(prof3password, saltRounds);

    let prof3;
    if(await bcrypt.compare(prof3password, prof3hash)){
        prof3 = await profiles.create({
            email: "pbaressi@stevens.edu",
            password: prof3hash,
            firstName: "Phillip",
            lastName: "Baressi",
            isAdmin: true,
            insuranceProvider: "Delta",
            photo: "../assets/img/Stevens/phil.jpg"
        });
    }
    

    await practitioners.removeAll();

    const officeA_ID = await practitioners.create({
        name: "Tom's Teeth",
        location: [{lat: 40.745090}, {long: -74.023965}],
        procedures: [
            {'Cleaning': 15.00},
            {'Fake tooth': 300.00},
            {'X-Ray': 150.00},
        ],
        providers: ['Delta', 'United'],
    });

    const officeB_ID = await practitioners.create({
        name: "Bill's Bones",
        location: [{lat: 40.746000}, {long: -74.028600}],
        procedures: [
            {'Splint': 30.00},
            {'Alignment': 125.00},
            {'X-Ray': 200.00},
        ],
        providers: ['Delta'],
    });

    const officeC_ID = await practitioners.create({
        name: "Al's Arms",
        location: [{lat: 40.754247}, {long: -74.032079}],
        procedures: [
            {'Hair removal': 123},
            {'Muscle toning': 499.99},
            {'Elbow cleaning': 13},
        ],
        providers: ['Horizon', 'Delta', 'United', 'Blue Cross'],
    });

    const officeD_ID = await practitioners.create({
        name: "Steve's Skin",
        location: [{lat: 40.741888}, {long: -74.036816}],
        procedures: [
            {'Wart removal': 10},
            {'Spray tan': 99.99},
            {'X-Ray': 200.00},
        ],
        providers: ['Horizon', 'Blue Cross'],
    });

    await appointments.deleteAll();
    const appointment1 = await appointments.create({
        userId: String(prof3._id),
        useremail: prof3.email,
        practitionerId: String(officeD_ID._id),
        practitionerName: officeD_ID.name,
        insurance: "Horizon",
        procedureInterest: "Wart removal",
        costSeen: "$10",
        verification: false
    });

    console.log(appointment1);
    




    const db = await conn();
    db.serverConfig.close();
};

main().catch(error => {
    console.log(error);
});