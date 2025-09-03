"use server";
import { ObjectId } from "mongodb";
import client from "./mongodb";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
// import z from "zod";

export type Chapter = {
  chapter: string;
  title: string;
  favorite: number;
  brief_summary: string;
  long_summary: string;
  images: string[];
};

export async function fetchChapters(query: string) {
  try {
    await client.connect();
    const db = client.db("gist-source").collection("chapters");

    const chapters = await db
      .find({
        $or: [
          { chapter: new RegExp(query, "i") },
          { title: new RegExp(query, "i") },
          // { brief_description: new RegExp(query, "i") },
          // { long_description: new RegExp(query, "i") },
        ],
      })
      .project({ _id: 0 })
      .sort({ chapter: 1 })
      .collation({ locale: "en", numericOrdering: true })
      .toArray();
    return JSON.parse(JSON.stringify(chapters));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function fetchChapterData(chapter: string) {
  try {
    await client.connect();
    // await new Promise((r) => setTimeout(r, 2000));
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

export async function addFavorite(chapter: string, is_add: boolean) {
  try {
    await client.connect();
    const db = client.db("gist-source").collection("chapters");

    const chapters = await db.updateOne(
      { chapter: chapter },
      { $inc: { favorite: is_add ? 1 : -1 } }
    );
    return JSON.parse(JSON.stringify(chapters));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function fetchComments(chapter: string) {
  try {
    await client.connect();
    const db = client.db("comments").collection("chapter_" + chapter);

    const comments = await db.find().sort({ like: -1, date: -1 }).toArray();
    return JSON.parse(JSON.stringify(comments));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function insertComment(chapter: string, formData: FormData) {
  try {
    const username = formData.get("username") || "(Anonymous)";
    const comment = formData.get("comment");
    if (!comment) return;

    await client.connect();
    const db = client.db("comments").collection("chapter_" + chapter);

    const result = await db.insertOne({
      username: username,
      comment: comment,
      date: new Date(),
      like: 0,
    });

    revalidatePath("/read/chapter_" + chapter);

    const uuid = result.insertedId.toString();
    const cookieStore = await cookies();
    const cookie_data = cookieStore.get("self_comment_id_list");

    const data = cookie_data ? [...JSON.parse(cookie_data.value)] : [];
    data.push(uuid);
    cookieStore.set("self_comment_id_list", JSON.stringify(data), {
      maxAge: 60 * 60 * 24 * 365,
    });
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function likeComment(
  chapter: string,
  uuid: string,
  is_add: boolean
) {
  try {
    await client.connect();
    const db = client.db("comments").collection("chapter_" + chapter);

    await db.updateOne(
      { _id: new ObjectId(uuid) },
      {
        $inc: { like: is_add ? 1 : -1 },
      }
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function deleteComment(chapter: string, uuid: string) {
  try {
    await client.connect();
    const db = client.db("comments").collection("chapter_" + chapter);

    await db.deleteOne({ _id: new ObjectId(uuid) });

    revalidatePath("/read/chapter_" + chapter);
  } catch (e) {
    console.error(e);
    return [];
  }
}

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

export async function insertSubsribe(formData: FormData) {
  try {
    const email = formData.get("email");
    if (!email) return;

    await client.connect();
    const db = client.db("user").collection("subscribe");

    await db.insertOne({ email: email });
  } catch (e) {
    console.error(e);
    return [];
  }
}
