const collections = require("../config/mongoCollections");
const practitioners = collections.practitioners;

module.exports = {
    async get(id) {
        if (!id) throw 'Invalid parameter: id';

        const practitionerCollection = await practitioners();
        const practitioner = await practitionerCollection.findOne({'_id': id});
        if (practitioner === null) throw 'Unable to find a practitioner with the given ID';

        return practitioner;
    },

    async getAll() {
        const practitionerCollection = await practitioners();

        return practitionerCollection.find({}).toArray();
    },

    async remove(id) {
        if (!id) throw 'Invalid parameter: id';

        const practitionerCollection = await practitioners();
        const res = await practitionerCollection.findOneAndDelete({'_id': id});
        if (!res.value) throw 'Unable to find a practitioner with the given ID';

        return {deleted: true, data: res.value};
    },

    async removeAll() {
        const practitionerCollection = await practitioners();

        await practitionerCollection.deleteMany({});
    },

    async update(id, update_) {
        /**
         * @param {Object|String} id - The document ID to update
         * @param update_ - field:value expressions or update operators. See 'create()' for document structure
         */
        if (!id || typeof update_ !== 'object') throw 'Invalid parameter: update_';
        if (update_.$set.name && typeof update_.$set.name !== 'string' || update_.$set.name === '') throw 'Invalid parameter: update_.$set.name';
        if (update_.$set.location && typeof update_.$set.location !== 'object' ||
            update_.$set.location.lat && typeof update_.$set.location.lat !== 'number' ||
            update_.$set.location.long && typeof update_.$set.location.long !== 'number') throw 'Invalid parameter: update_.$set.location';
        if (update_.$set.procedures && typeof update_.$set.procedures !== 'object') throw 'Invalid parameter: update_.$set.procedures';
        if (update_.$set.providers && !Array.isArray(update_.$set.providers)) throw 'Invalid parameter: data.providers';

        const practitionerCollection = await practitioners();
        const res = await practitionerCollection.updateOne({'_id': id}, update_);

        if (res.matchedCount === 0) throw 'Error: Unable to find practitioner by ID';
        if (res.matchedCount === 1 && res.modifiedCount === 0) throw 'Warning: New practitioner would be identical';
    },

    async create(data) {
        /**
         * @param {Object} data
         * @param {String} data.name - The name of the office
         * @param {Object} data.location - An object specifying latitude and longitute
         * @param {Number} data.location.lat
         * @param {Number} data.location.long
         * @param {Object} data.[procedures] - An optional object mapping procedures to prices
         * @param {Number} data.[procedures.["procedure"]] - Any amount of procedures, mapped to their price
         * @param {String[]} data.[providers] - An optional list of accepted insurance providers
         * @returns {ObjectId}
         */
        if (!data) throw 'Missing required parameter: data';
        if (!data.name || typeof data.name !== 'string' || data.name === '') throw 'Invalid parameter: data.name';
        if (!data.location || typeof data.location !== 'object' ||
            !data.location.lat || typeof data.location.lat !== 'number' ||
            !data.location.long || typeof data.location.long !== 'number') throw 'Invalid parameter: data.location';
        if (data.procedures && typeof data.procedures !== 'object') throw 'Invalid parameter: data.procedures';
        if (data.providers && !Array.isArray(data.providers)) throw 'Invalid parameter: data.providers';

        // Default value for optional fields
        data.procedures = (data.procedures) ? data.procedures : {};
        data.providers = (data.providers) ? data.providers : [];

        const practitionerCollection = await practitioners();

        const res = await practitionerCollection.insertOne(data);
        if (res.insertedCount === 0) throw 'Unable to create practitioner';

        return res.insertedId;
    }
};