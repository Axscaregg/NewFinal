const { MongoClient , ServerApiVersion} = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGODB_URI
let db;

async function connectDB() {
    if (db) return db;

    const client = new MongoClient(uri, {
        serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    });
    await client.connect();
    console.log(" Connected to MongoDB");

    db = client.db("myDatabase"); //
    return db;
}


function getDB() {
    if (!db) {
        throw new Error(" Database not initialized. Call connectDB() first.");
    }
    return db;
}

module.exports = { connectDB, getDB };
