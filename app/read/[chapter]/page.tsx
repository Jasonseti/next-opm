"use server";
import StateProvider from "./state-provider";
import Header from "./components/header/header";
import Book from "./components/book/book";
import PageNavigator from "./components/page-navigator/page-navigator";
import CommentSection from "./components/comments/comments";
import { Messages } from "./components/message";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ChaptersList, fetchChaptersList } from "../../lib/chapters";
import { fetchChapterData } from "../../lib/chapters";

export default async function ReaderPage(props: {
  params: Promise<{ chapter: string }>;
}) {
  const chapter = (await props.params)["chapter"].slice(8);
  const fetch_results = await fetchChaptersList();
  const cover_chapters = fetch_results
    .filter((data: ChaptersList) =>
      data.thumbnail.includes("https://static.wikia.nocookie.net/onepunchman/")
    )
    .map((data: ChaptersList) => data.chapter);
  const chapter_list = fetch_results.map((data: ChaptersList) => data.chapter);
  const chapter_index = chapter_list.findIndex(
    (chp: string) => chp === chapter
  );
  const next_chapter_thumbnail = fetch_results[chapter_index + 1].thumbnail;

  if (!chapter_list.includes(chapter)) redirect("/read/chapter-not-found");
  const { title, brief_summary, long_summary, images, dimensions } =
    await fetchChapterData(chapter);

  const getCookie = (name: string) =>
    JSON.parse(cookieStore.get(name)?.value || "[]");

  const cookieStore = await cookies();
  const page_mode = cookieStore.get("page_mode")?.value;
  const read_mode = cookieStore.get("read_mode")?.value;
  const summary_mode = cookieStore.get("summary_mode")?.value;
  const bookmarked = getCookie("bookmarked_list")[chapter_index];
  const favorited = getCookie("favorited_list")[chapter_index];
  const liked_id_list = getCookie("liked_id_list") || [];
  const self_comment_id_list = getCookie("self_comment_id_list") || [];

  return (
    <StateProvider
      props={{
        chapter: chapter,
        chapter_list: chapter_list,
        chapter_index: chapter_index,
        cover_chapters: cover_chapters,
        next_chapter_thumbnail: next_chapter_thumbnail,
      }}
      cookies={{
        page_mode: page_mode,
        read_mode: read_mode,
        summary_mode: summary_mode,
      }}
    >
      <Header
        props={{
          chapter: chapter,
          title: title,
          brief_summary: brief_summary,
          long_summary: long_summary,
          thumbnail: images[0],
          thumbnail_dimension: dimensions[0],
        }}
        cookies={{
          favorited: favorited,
          bookmarked: bookmarked,
        }}
      ></Header>

      <Book image_urls={images} image_dimensions={dimensions}></Book>
      <PageNavigator image_urls={images} image_dimensions={dimensions} />

      <CommentSection
        chapter={chapter}
        liked_id_list={liked_id_list}
        self_comment_id_list={self_comment_id_list}
      />

      <Messages />
    </StateProvider>
  );
}
