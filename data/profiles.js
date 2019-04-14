// Database for handling profiles
const collections = require("../config/mongoCollections")
// Gets profile collection from db
const profiles = collections.profiles

// Exports methods for creating updating and inserting
const exportedMethods = {

    // Function to create and add a new user profile to the collection
    async createProf(profileJSON){
        console.log(profileJSON)
        
        // Insert new profile into collection
        const profileCollection = await profiles()
        
        const insertInfo = await profileCollection.insertOne(profileJSON)

        if(insertInfo.insertedCount === 0){
            throw("Error profile.createProf: Could not add the profile to collection")
        }

        return

    }
}

module.exports = exportedMethods