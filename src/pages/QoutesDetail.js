import { Fragment, useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HightlightQuote from "../components/quotes/HighlightedQuote";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
const QoutesDetail = (props) => {
  const params = useParams();
  const match = useRouteMatch();
  const { quoteId } = params; // here we use distruction to prevent type all parms object in use effect dependance and re-excute the componnet for anything inside the object
  console.log(match); // the output is an object with keys path , url and params
  const { sendRequest, data, status, error } = useHttp(getSingleQuote, true);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
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

  if (!data.text) {
    return <h1>this qoute not found!</h1>;
  }
  return (
    <Fragment>
      <HightlightQuote text={data.text} author={data.author} />
      <Route path={`${match.url}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`/quotes/${params.quoteId}/comment`}>
            Load comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comment`} exact>
        <Comments />
      </Route>
    </Fragment>
  );
};
export default QoutesDetail;
