import { ObjectId } from 'mongodb';
import mongodb from '../db/mongodb.mjs';

const docManager = {
    getAllDocuments: async function getAllDocuments() {
        let db = await mongodb.getDb();

        try {
            const result = await db.collection.find().toArray();

            return result;
        } catch (e) {
            console.error(e);
            return null;
        } finally {
            await db.client.close();
        }
    },

    getDocumentById: async function getDocumentById(id) {
        let db = await mongodb.getDb();

        try {
            if (!ObjectId.isValid(id)) {
                return null;
            }

            const objectId = new ObjectId(id);
            const result = await db.collection.findOne(
                { _id: objectId }
            );

            return result;
        } catch (e) {
            console.error(e);
            return null;
        } finally {
            await db.client.close();
        }
    },

    createDocument: async function createDocument(body) {
        let db = await mongodb.getDb();

        try {
            if (!body.title || !body.content ) {
                return null;
            }

            const result = await db.collection.insertOne(
                { title: body.title, content: body.content }
            );

            return result;
        } catch (e) {
            console.error(e);
            return null;
        } finally {
            await db.client.close();
        }
    },

    updateDocument: async function (id, body) {
        let db = await mongodb.getDb();

        try {
            if (!ObjectId.isValid(id)) {
                return null;
            }

            const objectId = new ObjectId(id);
            const result = await db.collection.updateOne(
                { _id: objectId },
                { $set: { title: body.title, content: body.content } }
            );

            return result;
        } catch (e) {
            console.error(e);
            return null;
        } finally {
            await db.client.close();
        }
    },

    deleteDocument: async function (id) {
        let db = await mongodb.getDb();

        try {
            if (!ObjectId.isValid(id)) {
                return null;
            }

            const objectId = new ObjectId(id);
            const result = await db.collection.deleteOne(
                { _id: objectId }
            );

            return result;
        } catch (e) {
            console.error(e);
            return null;
        } finally {
            await db.client.close();
        }
    }
};

export default docManager;
