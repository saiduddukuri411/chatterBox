import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Join from './Pages/Join/frame';
import Chat from './Pages/Chat/frame';


const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Join} />
      <Route path="/Chat" exact component={Chat} />
    </Switch>
  </Router>
);

export default App;
