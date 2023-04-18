import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

// here we need to build a button for sort the list
//we will use somthing called query from the url
//the query is the other segment after ? and that don't change the router matching

const sortQuotes = (quotes, asc) => {
  return quotes.sort((quoteA, quoteB) => {
    if (asc) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else return quoteA.id < quoteB.id ? 1 : -1;
  });
};
const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSortingAcending = queryParams.get("sort") === "asc";
  const sortedQuotes = sortQuotes(props.quotes, isSortingAcending);
  const changeSortHandler = () => {
    // here we can write this with differ ways
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAcending ? "Dese" : "asc"}`,
    });

    // history.push(
    //   `${location.pathname}?sort=${isSortingAcending ? "Dese" : "asc"}`
    // );
  };
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>
          sorting {isSortingAcending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
