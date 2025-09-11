"use server";
import client from "./mongodb";

export type ChaptersList = {
  chapter: string;
  title: string;
  favorite: number;
  thumbnail: string;
};

export async function fetchChaptersList(query?: string) {
  try {
    await client.connect();
    const db = client.db("gist-source").collection("chapters");

    const chapters = await db
      .find({
        $or: [
          { chapter: new RegExp(query || "", "i") },
          { title: new RegExp(query || "", "i") },
          // { brief_description: new RegExp(query, "i") },
          // { long_description: new RegExp(query, "i") },
        ],
      })
      .project({ _id: 0, chapter: 1, title: 1, favorite: 1, thumbnail: 1 })
      .sort({ chapter: 1 })
      .collation({ locale: "en", numericOrdering: true })
      .toArray();
    return JSON.parse(JSON.stringify(chapters));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function fetchVolumeCovers() {
  try {
    await client.connect();
    const db = client.db("gist-source").collection("covers");

    const chapters = await db.find({}).project({ _id: 0 }).toArray();
    return JSON.parse(JSON.stringify(chapters));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export type ChapterData = {
  chapter: string;
  title: string;
  favorite: number;
  brief_summary: string;
  long_summary: string;
  images: string[];
  dimensions: number[][];
};

export async function fetchChapterData(chapter: string) {
  try {
    await client.connect();
    const db = client.db("gist-source").collection("chapters");

    const chapters = await db.findOne(
      { chapter: chapter },
      { projection: { _id: 0 } }
    );
    return JSON.parse(JSON.stringify(chapters));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function incrementFavorite(chapter: string, is_add: boolean) {
  try {
    await client.connect();
    const db = client.db("gist-source").collection("chapters");

    await db.updateOne(
      { chapter: chapter },
      { $inc: { favorite: is_add ? 1 : -1 } }
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}
