import clsx from "clsx";
import LikeButton from "../../../(sub-branch)/read/[chapter]/components/ui/like_button";
import CommentDrawer from "../../../(sub-branch)/read/[chapter]/components/ui/comment_drawer";
import { fetchComments } from "../../../../lib/comments";
import CommentForm from "../../../(sub-branch)/read/[chapter]/components/ui/comment_form";
import DeleteButton from "../../../(sub-branch)/read/[chapter]/components/ui/delete_button";

export default async function CommentSection({
  chapter,
  liked_id_list,
  self_comment_id_list,
}: {
  chapter: string;
  liked_id_list: string[];
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

  interface commentTypes {
    _id: string;
    username: string;
    date: string;
    comment: string;
    like: number;
  }

  function EditDelete({
    props,
    self_comment,
  }: {
    props: commentTypes;
    self_comment: boolean;
  }) {
    return (
      <div className="flex text-gray-200 px-[2vw] pt-[8px] pb-[10px] ml-[1.5vw] w-[95%] bg-gray-800 border-1 border-gray-500 my-[10px] rounded-bl-[10px] rounded-br-[15px] rounded-tl-[15px] rounded-tr-[10px]">
        <div className="w-[100%] flex flex-col">
          <div className="flex mb-[6px] text-[0.9em] text-gray-400">
            <p>{props.username}</p>
            <div className="w-[20px] text-center">-</div>
            <p>
              {new Date(props.date).toLocaleDateString("en", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex-auto w-[95%] overflow-auto text-wrap custom-comment-scrollbar">
            {props.comment}
          </div>
        </div>
        {self_comment && <DeleteButton chapter={chapter} uuid={props._id} />}
        <LikeButton
          chapter={chapter}
          uuid={props._id}
          likes={props.like}
          liked={liked_id_list.includes(props._id)}
        />
      </div>
    );
  }

  return (
    <CommentDrawer comments_length={comments.length}>
      <main className="relative mt-[25px] w-[min(90%,1100px)] h-[180px] lg:h-[200px] flex-none mx-auto flex flex-col">
        <h3 className="text-l text-gray-200">Leave a Comment!</h3>
        <hr className="w-[102%] -translate-x-[1%] border-[2px] border-gray-200 rounded-[100px]" />

        <CommentForm chapter={chapter} />
      </main>

      <main className="w-[min(90%,1100px)] mt-[15px] h-[65%] flex-auto mx-auto flex flex-col">
        <div className="text-l">
          <h2 className="text-[1.2em] text-gray-200">Top Comments</h2>
          <hr className="w-[102%] -translate-x-[1%] border-[2px] border-gray-200 rounded-[100px]" />
        </div>
        <div
          className={clsx(
            "flex-auto overflow-y-scroll overflow-x-hidden no-scrollbar"
          )}
        >
          {self_comments.map((props: commentTypes, i: number) => (
            <EditDelete key={i} props={props} self_comment={true} />
          ))}
          {public_comments.map((props: commentTypes, i: number) => (
            <EditDelete key={i} props={props} self_comment={false} />
          ))}

          <div className="flex h-[100px] text-m text-gray-200">
            <p
              className={
                "m-auto -z-10 " + (comments.length > 0 && "-translate-y-1/2")
              }
            >
              {comments.length > 0
                ? "- End of Comment -"
                : "- No Comments Yet -"}
            </p>
          </div>
        </div>
      </main>
    </CommentDrawer>
  );
}
