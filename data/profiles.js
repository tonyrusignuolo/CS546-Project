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

		if (insertInfo.insertedCount === 0) {
			throw ("Error profile.createProf: Could not add the profile to collection")
		}
		return this.get(insertInfo.insertedId);
	},

	async get(id) {

		if (!id) throw 'Error profiles.get: Invalid parameter: id';

		// if the id is not a string or an object we throw
		if(typeof id !== 'string' && typeof id !== 'object'){
			throw("Error profile.get: Invalid id type passed");
		}

		const profileCollection = await profiles();
		
		// Handling for the id being a string OR mongo Object if ID is valid or not
		let newId;
		if(typeof(id) !== 'object'){
			try{
				newId = new mongo.ObjectID(id)
			}
			catch(e){
				throw("Error profiles.get: Invalid ID")
			}
			
		}
		else{
			newId = id;
		}

		let profile;
		try{
			profile = await profileCollection.findOne({'_id': newId});
		}
		catch(e){
			throw("Error profile.get: No profile with that ID")
		}

        if (profile === null) throw 'Unable to find a profile with the given id: ' + id;

		return profile;
		
	},

	async getAll() {
        const profileCollection = await profiles();

        return profileCollection.find({}).toArray();
	},
	
	async remove(id) {
        if (!id) throw 'Invalid parameter: id';

        const profileCollection = await profiles();
        const res = await profileCollection.findOneAndDelete({'_id': id});
		
		if (res === null) throw 'Unable to find a profile with the given id: ' + id;

        return {deleted: true, data: res.value};
	},
	
	async removeAll() {
        const profileCollection = await profiles();

        await profileCollection.deleteMany({});
    },

	async update(id, update_) {
        /**
         * @param {Object|String} id - The document ID to update
         * @param update_ - field:value expressions or update operators. See 'create()' for document structure
         */
		
		 if (!id || typeof update_ !== 'object') throw 'Invalid parameter: update_';

        const profileCollection = await profiles();
        const res = await profileCollection.updateOne({'_id': id}, update_);

		if (res.modifiedCount === 0) throw 'Unable to update profile';
		return;
    }

}

module.exports = exportedMethods;