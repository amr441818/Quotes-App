import { useRef } from "react";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import classes from "./NewCommentForm.module.css";
import { useParams } from "react-router-dom";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const params = useParams();
  const { sendRequest, error, status } = useHttp(addComment);

  const submitFormHandler = (event) => {
    event.preventDefault();
    sendRequest({
      quoteId: params.quoteId,
      commentData: { text: commentTextRef.current.value },
    });

    // optional: Could validate here

    // send comment to server
  };
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "error") {
    return <div className="centered focused">{error}</div>;
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
