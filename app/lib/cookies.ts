"use server";
import { cookies } from "next/headers";

const cookie_age = 60 * 60 * 24 * 365;

export async function deleteAllCookies() {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    console.log(cookie.name);
    cookieStore.delete(cookie.name);
  });
}

export async function setSettingsCookies(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, { maxAge: cookie_age });
}

export async function setIDCookies(
  name: string,
  uuid: string,
  is_add: boolean
) {
  const cookieStore = await cookies();
  const cookie_data = cookieStore.get(name);

  const data = cookie_data ? [...JSON.parse(cookie_data.value)] : [];
  if (is_add) data.push(uuid);
  else data.splice(data.indexOf(uuid), 1);
  cookieStore.set(name, JSON.stringify(data), {
    maxAge: cookie_age,
  });
}
