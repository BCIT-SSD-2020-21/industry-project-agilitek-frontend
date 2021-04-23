import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateWorkflow from "./Pages/CreateWorkflow";
import Landing from "./Pages/Landing";

function App() {
  return (
    <>
      <Router>
        {/* <div className="bg-gray-800 pb-32"> */}
        <Switch>
          <Route path="/create">
            <CreateWorkflow />
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
        </Switch>
        {/* </div> */}
      </Router>
    </>
  );
}

export default App;
