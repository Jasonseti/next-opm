import { fetchChapterData } from "../../../lib/data";
import { cookies } from "next/headers";
import Book from "./components/book";
import Header from "./components/header";
import StateProvider from "./state_provider";
import PageNavigator from "./components/navigator";
import CommentSection from "./components/comments";
import Feedback from "./components/ui/feedback";
import { Messages } from "./components/message";
import { chapter_array } from "../../../variables";
import { redirect } from "next/navigation";

export default async function ReaderPage(props: {
  params: Promise<{ chapter: string }>;
}) {
  const chapter = (await props.params)["chapter"].slice(8);
  if (!chapter_array.includes(chapter)) redirect("/read/chapter-not-found");
  const { title, brief_summary, long_summary, images, image_dimensions } =
    await fetchChapterData(chapter);

  const getCookie = (name: string) =>
    JSON.parse(cookieStore.get(name)?.value || "[]");
  const chapter_index = chapter_array.findIndex((chp) => chp === chapter);

  const cookieStore = await cookies();
  const page_mode = cookieStore.get("page_mode")?.value;
  const read_mode = cookieStore.get("read_mode")?.value;
  const summary_mode = cookieStore.get("summary_mode")?.value;
  const favorited = getCookie("favorite_list")[chapter_index];
  const bookmarked = getCookie("bookmark_list")[chapter_index];
  const liked_id_list = getCookie("liked_id_list") || [];
  const self_comment_id_list = getCookie("self_comment_id_list") || [];

  return (
    <StateProvider
      cookies={{
        page_mode: page_mode,
        read_mode: read_mode,
        summary_mode: summary_mode,
      }}
    >
      <div className="bg-[#131b36] text-black overflow-hidden">
        <Header
          props={{
            chapter: chapter,
            title: title,
            brief_summary: brief_summary,
            long_summary: long_summary,
            thumbnail: images[0],
          }}
          cookies={{
            favorited: favorited,
            bookmarked: bookmarked,
          }}
        ></Header>
        <Book
          chapter={chapter}
          image_urls={images}
          image_dimensions={image_dimensions}
        ></Book>
        <PageNavigator
          image_urls={images}
          image_dimensions={image_dimensions}
        />
        <CommentSection
          chapter={chapter}
          liked_id_list={liked_id_list}
          self_comment_id_list={self_comment_id_list}
        />
        <Feedback chapter={chapter} />
        <Messages />
      </div>
    </StateProvider>
  );
}
