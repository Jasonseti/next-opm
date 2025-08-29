import client from "./mongodb";
// import { GetStaticProps } from "next";

export type Chapter = {
  chapter: string;
  title: string;
  rating: number;
  brief_summary: string;
  long_summary: string;
  images: string[];
};

export const fetchChapters = async (query: string) => {
  try {
    await client.connect();
    const db = client.db("gist-source").collection("chapters");

    const chapters = await db
      .find({
        $or: [
          { chapter: new RegExp(query, "i") },
          { title: new RegExp(query, "i") },
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
};

export const fetchChapterData = async (chapter: string) => {
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
};
