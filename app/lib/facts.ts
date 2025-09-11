"use server";
import client from "./mongodb";

export async function fetchFunFacts() {
  try {
    await client.connect();
    const db = client.db("gist-source").collection("funfacts");

    const chapters = await db.find({}).project({ _id: 0 }).toArray();
    return JSON.parse(JSON.stringify(chapters));
  } catch (e) {
    console.error(e);
    return [];
  }
}
