import { MongoClient, ServerApiVersion } from "mongodb";

const uri: string = process.env.MONGODB_URI ? process.env.MONGODB_URI : "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default client;
