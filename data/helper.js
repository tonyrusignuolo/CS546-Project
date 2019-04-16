module.exports = {
	async convertId(id) {
		if (typeof id === "string") {
			try {
				id = ObjectID.createFromHexString(id);
			} catch (err) {
				throw "index convertID id format"
			}
		} else if (!id._bsontype && id._bsontype !== "ObjectID") {
			throw "index convertID id type";
		}
		return id;
	}
}