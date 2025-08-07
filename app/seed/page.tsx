import client from "../../lib/connect_db";
import { volume_source, chapter_source } from "../../lib/gist-source";

export default function Page() {
  function run() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function dict_to_array(dict: any) {
      const array = [];
      for (const key in dict) {
        array.push({ [key]: dict[key] });
      }
      return array;
    }

    try {
      let db = client.db("gist-source").collection("volumes");
      db.deleteMany({});
      db.insertMany(dict_to_array(volume_source["volumes"]));
      console.log("Volumes Updated!");

      db = client.db("gist-source").collection("chapters");
      db.deleteMany({});
      db.insertMany(dict_to_array(chapter_source["chapters"]));
      console.log("Chapters Updated!");
    } finally {
      return "Update Success!";
    }
  }
  return <>{run()}</>;
}
