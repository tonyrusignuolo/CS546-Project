// Database for handling profiles
const collections = require("../config/mongoCollections")
// Gets profile collection from db
const profiles = collections.profiles;
const helper = require("./helper");


// Exports methods for creating updating and inserting
const exportedMethods = {

    // Function to create and add a new user profile to the collection
    async create(profileJSON){
        console.log(profileJSON)
        
        // Insert new profile into collection
        const profileCollection = await profiles()
        
        const insertInfo = await profileCollection.insertOne(profileJSON)

		const insertInfo = await profileCollection.insertOne(profileJSON)

		if (insertInfo.insertedCount === 0) {
			throw ("Error profile.createProf: Could not add the profile to collection")
		}
		return this.read(insertInfo.insertedId);
	},

	async read(id) {
		id = await helper.convertId(id);
		let profileCollection = await profiles();
		return profileCollection.findOne({
			_id: id
		});
	}
}

module.exports = exportedMethods;