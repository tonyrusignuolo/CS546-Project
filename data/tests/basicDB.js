const practitioners = require('../practitioners');
const conn = require('../../config/mongoConnection');

const main = async () => {
    await practitioners.removeAll();

    const officeA_ID = await practitioners.create({
        name: "Tom's Teeth",
        location: {lat: 40.745090, long: -74.023965},
        procedures: {
            'Cleaning': 15.00,
            'Fake tooth': 300.00,
            'X-Ray': 150.00,
        },
        acceptedProviders: ['Delta', 'United'],
    });

    const officeB_ID = await practitioners.create({
        name: "Bill's Bones",
        location: {lat: 40.746000, long: -74.028600},
        procedures: {
            'Splint': 30.00,
            'Alignment': 125.00,
            'X-Ray': 200.00,
        },
        acceptedProviders: ['Delta', 'United'],
    });

    console.log(await practitioners.get(officeA_ID));
    console.log(await practitioners.get(officeB_ID));

    await practitioners.update(officeA_ID, {$push: {acceptedProviders: 'Blue Cross'}});
    await practitioners.update(officeB_ID, {$set: {'procedures.X-Ray': 399.99, 'procedures.Cast': 50.00}});

    console.log(await practitioners.get(officeA_ID));
    console.log(await practitioners.get(officeB_ID));

    const db = await conn();
    db.serverConfig.close();
};

main().catch(error => {
    console.log(error);
});