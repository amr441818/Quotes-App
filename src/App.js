import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import AddQoutes from "./pages/addQoutes";
// import AllQoutes from "./pages/allQoutes";
// import QoutesDetail from "./pages/QoutesDetail";
// import Layout from "./components/layout/Layout";
// import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";
const AddQoutes = React.lazy(() => import("./pages/addQoutes"));
const QoutesDetail = React.lazy(() => import("./pages/QoutesDetail"));
const Layout = React.lazy(() => import("./components/layout/Layout"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AllQoutes = React.lazy(() => import("./pages/allQoutes"));
function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQoutes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QoutesDetail />
          </Route>
          <Route path="/addNewQuote">
            <AddQoutes />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
