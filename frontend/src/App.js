import React from "react"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import UserDash from "./components/Landing/userDash"
import CreateWorkflow from "./Pages/CreateWorkflow"
import Landing from "./Pages/Landing"
import WorkflowForm from "./components/WorkflowForm/index"
import WorkflowTable from "./components/WorkflowTable/WorkflowTable"

function App() {
  return (
    <>
      <Router>
        {/* <div className="bg-gray-800 pb-32"> */}
        <Switch>
          <Route exact path="/create">
            <UserDash children={<WorkflowForm />} />
          </Route>
          <Route exact path="/">
            <UserDash children={<WorkflowTable />} />
          </Route>
        </Switch>
        {/* </div> */}
      </Router>
    </>
  )
}

export default App
