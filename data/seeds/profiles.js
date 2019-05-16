// Seeds profiles data
const profiles = require('../profiles');
const conn = require('../../config/mongoConnection');

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
    


    // Run the seed, console.log should return the two profiles above in the database

    // Comments below were for testing, everything currently works::::::::::::


    // console.log(await profiles.get(prof1._id));
    // console.log(await profiles.get(prof2._id));

    // await profiles.update(prof1._id, {$set: {insuranceProvider: 'Blue Cross'}});
    // await profiles.update(prof2._id, {$set: {firstName: "Cersie"}});

    // console.log(await profiles.get(prof1._id));
    // console.log(await profiles.get(prof2._id));

    // console.log(await profiles.getAll());

    // await profiles.remove(prof1._id);
    // console.log(await profiles.getAll())

    const db = await conn();
    db.serverConfig.close();
};

main().catch(error => {
    console.log(error);
});