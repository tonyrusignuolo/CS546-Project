// Database for handling appointments
const collections = require("../config/mongoCollections");
// Gets appoitments collection from db
const appointments = collections.appointments;
const helper = require("./helper");
const ObjectID = require("mongodb").ObjectID;
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

	async update(id, update) {
		/**
         * @param {Object|String} id - The document ID to update
         * @param update - field:value expressions or update operators. See 'create()' for document structure
         */

		// id = await helper.convertId(id);
		console.log(id);
		let appointmentsCollection = await appointments();
		let res = await appointmentsCollection.updateOne({ '_id': id }, update);

		if (res.matchedCount === 0) throw 'Error: Unable to find practitioner by ID';
		if (res.matchedCount === 1 && res.modifiedCount === 0) throw 'Warning: New practitioner would be identical';
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

	// Gets all appointments that specific user has made
	async getAllWithUserId(id){

		if(!id || id === undefined || id === ''){
			throw "Error: appointments getAllWithUserId no id passed"
		}
		
		const appointmentsCollection = await appointments();
		let res = await appointmentsCollection.find({userId: id}).toArray();
		
		return(res)

	}


};