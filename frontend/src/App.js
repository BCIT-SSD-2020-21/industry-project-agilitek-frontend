import React from "react"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import UserDash from "./components/Landing/userDash"
import CreateWorkflow from "./Pages/CreateWorkflow"
import Landing from "./Pages/Landing"
import WorkflowForm from "./components/WorkflowForm/WorfkflowForm"
import ErrorPage from "./components/ErrorPage/ErrorPage"
import WorkflowTable from "./components/WorkflowTable/WorkflowTable"
import WorkflowDetail from "./components/WorkflowDetails/WorkflowDetail"

function App() {
  return (
    <Router>
      {/* <div className="bg-gray-800 pb-32"> */}
      <Switch>
        <Route exact path="/">
          <UserDash page="main" children={<WorkflowTable />} />
        </Route>
        <Route exact path="/create">
          <UserDash children={<WorkflowForm />} />
        </Route>
        <Route exact path="/configure/:id">
          <UserDash children={<WorkflowForm />} />
        </Route>
        <Route exact path="/details/:id">
          <UserDash children={<WorkflowDetail />} />
        </Route>
        <Route exact path="/404">
        <UserDash children={<ErrorPage />} />
        </Route>
      </Switch>
      {/* </div> */}
    </Router>
  )
}

export default App
