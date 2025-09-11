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
)["chapters"];
const chapter_list = Object.keys(chapter_source);
const funfacts = [
  "Tatsumaki, despite her appearance, is actually five years older than her sister Fubuki.",
  "Despite being the number one hero, Blast is rarely seen in action, with his last major feat occurring two years before Saitama's story began.",
  "Saitama's character design is based off of Anpanman, a children's character from an old Japanese cartoon.",
  "Saitama's name comes from the Japanese province where his creator lives",
  "Prior to becoming a the Caped Baldy, Saitama had part time jobs as a construction worker and a convenience store clerk. One of Saitama's experiences while working at a store was depicted in a picture diary that used to live on the creator's website.",
  "The Hero Association was started by Saitama because he saves the grandson of Agoni, the multi-millionaire who then founded the Hero Association.",
  "Garou is wearing a different style of clothing in the webcomic. While he is known for his martial arts getup in the manga, in the original webcomic he is wearing regular sneakers and jeans, even as a monster.",
  "According to ONE, although Saitama is bald, he has hair everywhere else on his body.",
  "Genos can sleep because he has a ‘sleep mode.’",
];
const volume_covers = chapter_list
  .map((chp) => chapter_source[chp])
  .filter((data) =>
    data.images[0].includes("https://static.wikia.nocookie.net/onepunchman/")
  )
  .map((data) => data.images[0]);

async function seedChapters() {
  await client.connect();
  const db = client.db("gist-source").collection("chapters");
  const favorites = await db
    .find({})
    .project({ _id: 0, favorite: 1 })
    .sort({ chapter: 1 })
    .collation({ locale: "en", numericOrdering: true })
    .toArray();

  const chapter_array = [];
  Object.keys(chapter_source).map((_, i) => {
    chapter_array.push(
      Object.assign(
        {},
        {
          chapter: chapter_list[i].split("-")[1],
          favorite: favorites[i]?.favorite || 0,
          thumbnail: chapter_source[chapter_list[i]].images[0],
        },
        chapter_source[chapter_list[i]]
      )
    );
  });

  const cover_chapters = chapter_array.filter((data) =>
    data.images[0].includes("https://static.wikia.nocookie.net/")
  );
  const variables = {
    chapter_array: chapter_array.map((data) => data.chapter),
    cover_chapters: cover_chapters.map((data) => data.chapter),
    tankobon_covers: cover_chapters.map((data) => data.images[0]),
  };
  fs.writeFile("./app/lib/variables.json", JSON.stringify(variables), () => {});

  await db.deleteMany({});
  await db.insertMany(chapter_array);
  console.log("Chapters Updated!");
  client.close();
}
async function seedFunFacts() {
  await client.connect();
  const db = client.db("gist-source").collection("funfacts");

  const fact_arrays = funfacts.map((fact) => {
    return { fact: fact };
  });
  await db.deleteMany({});
  await db.insertMany(fact_arrays);
  console.log("Facts Updated!");
  client.close();
}
async function seedVolumeCovers() {
  await client.connect();
  const db = client.db("gist-source").collection("covers");

  const covers = volume_covers.map((url) => {
    return { cover_url: url };
  });
  await db.deleteMany({});
  await db.insertMany(covers);
  console.log("Covers Updated!");
  client.close();
}

seedChapters();
seedFunFacts();
seedVolumeCovers();
