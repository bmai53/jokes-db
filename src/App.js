import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./Components/Layout";

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' render={() => <Layout />} />
        <Route
          path='/:id'
          render={(props) => <Layout directLinkId={props.match.params.id} />}
        />
      </Switch>
    </>
  );
}

export default App;
