import React, { useEffect, useState } from "react";
import { fetchComments } from "../../features/comments/commentsSlice";
import { useSelector, useDispatch } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { deleteComment } from "../../features/comments/commentsSlice";
import EditCommentForm from "./EditCommentForm";
const CommentShow = ({ postId }) => {
  const [showEditForm, setShowEditForm] = useState([]);

  const comments = useSelector((state) =>
    state.comments.comments.filter(
      (postComments) => postComments.post === postId
    )
  );
  const commentStatus = useSelector((state) => state.comments.status[postId]);
  const currentUser = useSelector((state) => state.users.currentUser);
  const error = useSelector((state) => state.comments.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof commentStatus === "undefined") {
      dispatch(fetchComments(postId));
    }
  }, [commentStatus, dispatch, postId]);

  if (commentStatus === "failed") {
    return <div>No comment found</div>;
  }

  const deleteCommentHandler = (commentId) => {
    const data = {
      postId,
      commentId,
    };
    dispatch(deleteComment(data));
  };

  const editCommentHandler = (index) => {
    setShowEditForm((prevShowEditForm) =>
      prevShowEditForm.includes(index)
        ? prevShowEditForm.filter((form) => form !== index)
        : [...prevShowEditForm, index]
    );
  };

  const renderEditForm = (content, commentId, index) => {
    if (showEditForm.includes(index)) {
      return (
        <EditCommentForm
          postId={postId}
          content={content}
          commentId={commentId}
        />
      );
    }
  };

  const renderButtons = (commentId, index, author) => {
    if (currentUser === author) {
      return (
        <span className="ml-auto">
          <Button
            variant="outline-danger"
            className="mr-1"
            size="sm"
            onClick={() => deleteCommentHandler(commentId)}
          >
            Delete
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => editCommentHandler(index)}
          >
            Edit
          </Button>
        </span>
      );
    }
  };

  const renderedComment = comments.map((comment, index) => (
    <li key={comment._id}>
      <div className="d-flex ">
        <span dangerouslySetInnerHTML={{ __html: comment.content }} />
        {renderButtons(comment._id, index, comment.author.username)}
      </div>
      <div className="text-muted ml-2">
        by {comment.author.full_name} at {comment.formatted_date}
      </div>
      {renderEditForm(comment.content, comment._id, index)}
      <hr />
    </li>
  ));

  if (commentStatus === "failed") {
    return <div>{error}</div>;
  } else if (commentStatus === "loading") {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    return (
      <section style={{ overflowY: "scroll", height: "30vh" }}>
        <ul>{renderedComment}</ul>
      </section>
    );
  }
};

export default CommentShow;
