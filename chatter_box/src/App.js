import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Join from "./Pages/Join/frame";
import Chat from "./Pages/Chat/frame";
import Createroom from "./Pages/Room/frame";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Join} />
      <Route path="/chat" exact component={Chat} />
      <Route path="/create" exact component={Createroom} />
    </Switch>
  </Router>
);

export default App;
