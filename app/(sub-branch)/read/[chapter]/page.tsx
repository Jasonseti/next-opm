import { fetchChapterData } from "../../../../lib/data";
import Book from "./components/book";
import Header from "./components/header";
import StateProvider from "./state_provider";
import PageNavigator from "./components/navigator";
import CommentSection from "./components/comments";

export default async function ReaderPage(props: {
  params: Promise<{ chapter: string }>;
}) {
  const chapter = (await props.params)["chapter"].slice(8);
  const {
    title,
    rating,
    brief_summary,
    long_summary,
    images,
    image_dimensions,
  } = await fetchChapterData(chapter);
  return (
    <StateProvider>
      <div className="bg-[#131b36] overflow-hidden">
        <Header
          props={{
            chapter: chapter,
            title: title,
            rating: rating,
            brief_summary: brief_summary,
            long_summary: long_summary,
            thumbnail: images[0],
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
        <CommentSection comments={[""]} />
      </div>
    </StateProvider>
  );
}
