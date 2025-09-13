import CommentDrawer from "./comment-drawer";
import CommentForm from "./comment-form";
import ShowComments from "./show-comments";
import { fetchComments } from "../../../../lib/comments";

export type commentTypes = {
  _id: string;
  username: string;
  date: string;
  comment: string;
  like: number;
};

export default async function CommentSection({
  chapter,
  self_comment_id_list,
}: {
  chapter: string;
  self_comment_id_list: string[];
}) {
  const comments = await fetchComments(chapter);
  const grouped_comments = Object.groupBy(comments, (props: commentTypes) =>
    self_comment_id_list.includes(props._id)
      ? "self_comments"
      : "public_comments"
  );
  const self_comments = grouped_comments.self_comments || [];
  const public_comments = grouped_comments.public_comments || [];

  return (
    <CommentDrawer comments_length={comments.length}>
      <div className="h-[10px]" />
      <main className="w-[min(90vw,1100px)] h-[25%] min-h-[150px] mx-auto mt-[min(2vw,25px)] flex flex-col">
        <h3 className="text-[1.5em]">Leave Your Comment!</h3>
        <hr className="w-[102%] -translate-x-[1%] border-[2px] border-gray-200 rounded-[100px]" />

        <CommentForm chapter={chapter} />
      </main>

      <main className="w-[min(90vw,1100px)] mt-[1em] h-[65%] mx-auto flex flex-col">
        <h3 className="text-[1.5em]">Top Comments</h3>
        <hr className="w-[102%] -translate-x-[1%] border-[2px] border-gray-200 rounded-[100px]" />
        <div className="flex-auto overflow-y-scroll overflow-x-hidden no-scrollbar">
          {self_comments.map((props, i: number) => (
            <ShowComments key={i} props={props} self_comment={true} />
          ))}
          {public_comments.map((props, i: number) => (
            <ShowComments key={i} props={props} self_comment={false} />
          ))}

          <p
            className={
              "text-center -z-10 " +
              (comments.length > 0 ? "mt-[1em]" : "mt-[2em]")
            }
          >
            {comments.length > 0 ? "- End of Comment -" : "- No Comments Yet -"}
          </p>
        </div>
      </main>
    </CommentDrawer>
  );
}
