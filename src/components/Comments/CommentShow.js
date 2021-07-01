import React, { useEffect } from "react";
import { fetchComments } from "../../features/comments/commentsSlice";
import { useSelector, useDispatch } from "react-redux";

const CommentShow = ({ postId }) => {
  const comments = useSelector((state) =>
    state.comments.comments.filter(
      (postComments) => postComments.post === postId
    )
  );

  const commentStatus = useSelector((state) => state.comments.status[postId]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof commentStatus === "undefined") {
      console.log(commentStatus);
      dispatch(fetchComments(postId));
    }
  }, [commentStatus, dispatch, postId]);

  if (commentStatus === "failed") {
    return <div>No comment found</div>;
  }
  const renderedComment = comments.map((comment) => (
    <li key={comment._id}>
      <p>{comment.content}</p>
      by {comment.author.full_name}
    </li>
  ));

  return renderedComment;
};

export default CommentShow;
