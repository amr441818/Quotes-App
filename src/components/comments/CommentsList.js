import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentItem from "./CommentItem";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./CommentsList.module.css";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";

const CommentsList = (props) => {
  const params = useParams();
  const { quoteId } = params;
  const { sendRequest, data, error, status } = useHttp(getAllComments, true);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  console.log(data);
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
  if (status === "completed" && data.length === 0) {
    return <div className="centered">No Comments Yet.</div>;
  }
  return (
    <ul className={classes.comments}>
      {data.map((comment) => (
        <CommentItem key={comment.id} text={comment.text} />
      ))}
    </ul>
  );
};

export default CommentsList;
