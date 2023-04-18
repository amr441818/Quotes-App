import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
const AddQoutes = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();
  // here we will use useEffect for make redirect depends on the status
  useEffect(() => {
    if (status === "completed") {
      // to redirect to other page in case we sent the data to the server
      history.push("/quotes");
    }
  });
  const addQuoteHandler = (newQuote) => {
    sendRequest(newQuote);
  };
  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};
export default AddQoutes;
