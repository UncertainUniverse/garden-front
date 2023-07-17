// Run `npm run db` to retrieve all the documents on the command line.

const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const collections = ["first-principles", "introduction"];
const db_uri = "mongodb+srv://admin:srPiJzF8MVXkkqpL@sample-db.tkcfqem.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(db_uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// We currently have two collections populated: `first-principles` and `introduction`
async function retrievePosts(branch) {
    if (!collections.includes(branch)) {
        console.error("Cannot retrieve data from invalid collection: ", branch);
    }

    try {
        await client.connect();
        const db = client.db("uncertain-universe");
        const collection = db.collection(branch);

        // To get all the posts from a collection; {} is an empty filter
        const allPosts = collection.find({});

        await allPosts.forEach(console.log);
    } catch (e) {
        console.error(e);
    }
}

async function main() {
    collections.forEach(col => {
        retrievePosts(col);
    });
}

main().then(console.log).catch(console.error).finally(() => {
    client.close();
});