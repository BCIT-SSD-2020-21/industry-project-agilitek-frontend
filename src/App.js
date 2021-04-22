import React from 'react'
import Navbar from './components/Navbar'
import MainPage from './components/MainPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
   <>
   
    <Router>
    <div className="bg-gray-800 pb-32">
      <Navbar/>
      <Switch>
        <Route path="/config">
          <MainPage></MainPage>
        </Route>
        <Route path="/">
          <></>
        </Route>
      </Switch>
      </div>
    </Router>
   </>
  );
}

export default App;
