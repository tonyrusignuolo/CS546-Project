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
        providers: ['Delta', 'United'],
    });

    const officeB_ID = await practitioners.create({
        name: "Bill's Bones",
        location: {lat: 40.746000, long: -74.028600},
        procedures: {
            'Splint': 30.00,
            'Alignment': 125.00,
            'X-Ray': 200.00,
        },
        providers: ['Delta'],
    });

    const officeC_ID = await practitioners.create({
        name: "Al's Arms",
        location: {lat: 40.754247, long: -74.032079},
        procedures: {
            'Hair removal': 123,
            'Muscle toning': 499.99,
            'Elbow cleaning': 13,
        },
        providers: ['Horizon', 'Delta', 'United', 'Blue Cross'],
    });

    const officeD_ID = await practitioners.create({
        name: "Steve's Skin",
        location: {lat: 40.741888, long: -74.036816},
        procedures: {
            'Wart removal': 10,
            'Spray tan': 99.99,
            'X-Ray': 200.00,
        },
        providers: ['Horizon', 'Blue Cross'],
    });

    const db = await conn();
    db.serverConfig.close();
};

main().catch(error => {
    console.log(error);
});