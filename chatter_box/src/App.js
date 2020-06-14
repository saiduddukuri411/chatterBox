import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Join from "./Pages/Join/frame";
import Chat from "./Pages/Chat/frame";
import Createroom from "./Pages/Room/frame";
import { GroupContest } from "./userContest";


const App = () => {
  const [groupToken, setGroupToken] = React.useState(null);
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Join} />
        <Route path="/chat" exact={true} component={Chat} />
        <Route path="/create" exact={true} component={Createroom} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
