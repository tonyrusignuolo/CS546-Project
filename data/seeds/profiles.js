const profiles = require('../profiles');
const conn = require('../../config/mongoConnection');

const main = async () => {
    await profiles.removeAll();

    const prof1 = await profiles.create({
        email: "dragon@gmail.com",
        hashedPassword: "XXXAAAABBBB",
        firstName: "Lieutenant",
        lastName: "Dan",
        isAdmin: "Yes",
        insuranceProvider: "Delta"
    });

    const prof2 = await profiles.create({
        email: "JL@yahoo.com",
        hashedPassword: "GGGssga3rafFF",
        firstName: "Jamie",
        lastName: "Lannister",
        isAdmin: "No",
        insuranceProvider: "Southwest Airlines"
    });

    console.log(await profiles.get(prof1._id));
    console.log(await profiles.get(prof2._id));

    await profiles.update(prof1._id, {$set: {insuranceProvider: 'Blue Cross'}});
    await profiles.update(prof2._id, {$set: {firstName: "Cersie"}});

    console.log(await profiles.get(prof1._id));
    console.log(await profiles.get(prof2._id));

    await profiles.removeAll();

    const db = await conn();
    db.serverConfig.close();
};

main().catch(error => {
    console.log(error);
});