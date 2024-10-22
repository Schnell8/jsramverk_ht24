import 'dotenv/config';

import { MongoClient, ServerApiVersion } from 'mongodb';

const collectionName = "documents";

const database = {
    getDb: async function getDb() {
        let dsn = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}`
        + `@jsramverk.dp61x.mongodb.net/?retryWrites=true&w=majority&appName=jsramverk`;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        }

        const client = new MongoClient(dsn, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            collection: collection,
            client: client,
        };
    }
};

export default database;
