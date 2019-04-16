// Database for handling appointments
const collections = require("../config/mongoCollections");
// Gets appoitments collection from db
const appointments = collections.appointments;
const helper = require("./helper");

// Exports methods for CRUD
module.exports = {
	async create(object) {
		// Function to create new appointments
		let appointmentsCollection = await appointments();
		let insertInfo = await appointmentsCollection.insertOne(object);
		if (insertInfo.insertedCount === 0) {
			throw ("Error profile.createProf: Could not add the profile to collection");
		}
		return this.read(insertInfo.insertedId);
	},

	async read(id) {
		id = await helper.convertId(id);
		let appointmentsCollection = await appointments();
		return appointmentsCollection.findOne({
			_id: id
		});
	},

	async readAll() {
		let appointmentsCollection = await appointments();
		return appointmentsCollection.find({}).toArray();
	},

	async update(id) {
		id = await helper.convertId(id);
		let appointmentsCollection = await appointments();
	},

	async delete(id) {
		id = await helper.convertId(id);
		let appointment = await this.read(id);
		let appointmentsCollection = await appointments();
		let deletionInfo = await appointmentsCollection.removeOne({
			_id: id
		});
		if (deletionInfo.deletedCount === 0) throw "Error: appointments delete deletedCount == 0";
		return {
			deleted: true,
			data: appointment
		};
	},

	async deleteAll() {
        const appointmentsCollection = await appointments();
        await appointmentsCollection.deleteMany({});
    },
};