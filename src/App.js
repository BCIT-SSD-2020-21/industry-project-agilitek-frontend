import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserDash from './components/Landing/userDash';
import WorkflowForm from './components/WorkflowForm/WorfkflowForm';
import ErrorPage from './components/ErrorPage/ErrorPage';
import WorkflowDetail from './components/WorkflowDetails/WorkflowDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <UserDash page="main" />
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
    </Router>
  );
}

export default App;
