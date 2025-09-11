"use server";
import { cookies } from "next/headers";

const cookie_age = 60 * 60 * 24 * 365;

export async function setChapterCookies(
  name: string,
  chapter: string,
  chapter_list: string[],
  value: boolean | number
) {
  const cookieStore = await cookies();
  const cookie_data = cookieStore.get(name);
  const data = cookie_data
    ? [...JSON.parse(cookie_data.value)]
    : Array(chapter_list.length).fill(false);

  const chapter_index = chapter_list.findIndex(
    (chp: string) => chp === chapter
  );

  data[chapter_index] = value;
  cookieStore.set(name, JSON.stringify(data), { maxAge: cookie_age });
}

export async function setSettingsCookies(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, { maxAge: cookie_age });
}

// export async function setIDCookies(
//   name: string,
//   uuid: string,
//   is_add: boolean
// ) {
//   const cookieStore = await cookies();
//   const cookie_data = cookieStore.get(name);

//   const data = cookie_data ? [...JSON.parse(cookie_data.value)] : [];
//   if (is_add) data.push(uuid);
//   else data.splice(data.indexOf(uuid), 1);
//   cookieStore.set(name, JSON.stringify(data), {
//     maxAge: cookie_age,
//   });
// }
