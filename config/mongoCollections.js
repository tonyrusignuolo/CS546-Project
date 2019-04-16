const dbConnection = require("./mongoConnection");

/* This will allow to have one reference to each collection per app */
let getCollectionFn = collection => {
	let _col = undefined

	return async () => {
        if(!_col){
            // Waits for the data base connection and stores in db variable
            const db = await dbConnection()
            // Calls the collection and sets to _col
            _col = await db.collection(collection)
        }
        // Returns the collection
        return _col
    }
}

/* Collections get listed here */
module.exports = {
	profiles: getCollectionFn("profiles"),
	appointments: getCollectionFn("appointments"),
    practitioners: getCollectionFn("practitioners"),
};