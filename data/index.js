// Index file to export the data modules

const profileData = require("./profiles");
const appointmentsData = require("./appointments");
const practitionerData = require("./practitioners");

module.exports = {
	profiles: profileData,
	appointments: appointmentsData,
	practitioners: practitionerData,
};