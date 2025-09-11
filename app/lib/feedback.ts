"use server";
import client from "./mongodb";

export async function insertFeedback(chapter: string, text: string) {
  try {
    await client.connect();
    const db = client.db("user").collection("feedback");

    await db.insertOne({ chapter: chapter, text: text });
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function insertSubsribe(email: string) {
  try {
    await client.connect();
    const db = client.db("user").collection("subscribe");

    await db.insertOne({ email: email });
  } catch (e) {
    console.error(e);
    return [];
  }
}
