import { MongoClient, ServerApiVersion } from "mongodb";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local", override: true });

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const chapter_source = JSON.parse(
  fs.readFileSync("./public/sources/chapter_source.json", "utf8")
);

function dict_to_array(dict) {
  const array = [];
  for (const key in dict) {
    array.push(Object.assign({}, { chapter: key }, dict[key]));
  }
  return array;
}

try {
  await client.connect();
  const db = client.db("gist-source").collection("chapters");
  await db.deleteMany({});
  await db.insertMany(dict_to_array(chapter_source["chapters"]));
  console.log("Chapters Updated!");
} finally {
  client.close();
}
