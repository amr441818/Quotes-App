import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFoud from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

const AllQoutes = () => {
  const { sendRequest, data, status, error } = useHttp(getAllQuotes, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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
  if ((status === "completed" && !data) || data.length === 0) {
    return (
      <div className="centered">
        <NoQuotesFoud />
      </div>
    );
  }
  return <QuoteList quotes={data} />;
};
export default AllQoutes;
