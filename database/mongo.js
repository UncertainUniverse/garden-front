import { MongoClient } from 'mongodb'
const uri =
	'mongodb+srv://admin:srPiJzF8MVXkkqpL@sample-db.tkcfqem.mongodb.net/?retryWrites=true&w=majority'

let cachedClient = null

export async function connectToDataBase() {
	if (cachedClient) {
		return cachedClient
	}
	const client = await MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	cachedClient = client
	return client
}
