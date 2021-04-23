import React from "react"
import Navbar from "./components/Navbar/Navbar"
import DashboardPage from "./Pages/DashboardPage"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

function App() {
  return (
    <>
      <Router>
        <div className="bg-gray-800 pb-32">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <DashboardPage></DashboardPage>
            </Route>
            <Route path="/workflow">
              <></>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  )
}

export default App
