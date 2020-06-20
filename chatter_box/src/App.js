import React,{Suspense} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import Join from "./Pages/Join/frame";
//import Chat from "./Pages/Chat/frame";
//import Createroom from "./Pages/Room/frame";
import Loader from './Pages/Models/Loader/frame';
import { GroupContest } from "./userContest";
import io from "socket.io-client";
const Createroom = React.lazy(() => import("./Pages/Room/frame"));
const Chat = React.lazy(() => import("./Pages/Chat/frame"));
const App = () => {
  const [groupToken, setGroupToken] = React.useState(null);
  const [logIn, setLogIn] = React.useState(false);
  const [expiresAt, setExpiresAt] = React.useState(null);
  const [userName, setUserName] = React.useState(null);
  const [userSocket, setSocket] = React.useState(null);
  const [activeUsers, setUsers] = React.useState([]);
  React.useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      if (storedData.token && storedData.expiration) {
        if (new Date(storedData.expiration) > new Date()) {
          setLogIn(true);
          setGroupToken(storedData.token);
          setExpiresAt(storedData.expiration);
          setUserName(storedData.userName);
        }
      }
    }
  }, []);
  React.useEffect(() => {
    if (userSocket && !logIn) {
      userSocket.emit("logout");
      userSocket.off();
    }
  }, [userSocket, logIn]);
  React.useEffect(() => {
    let logoutTimer;
    if (groupToken && expiresAt) {
      const remainingTime =
        new Date(expiresAt).getTime() - new Date().getTime();
      logoutTimer = setTimeout((remainingTime) => {
        setLogIn((prev) => false);
        setGroupToken((prev) => null);
        setExpiresAt((prev) => null);
        setUserName((prev) => null);
        localStorage.removeItem("userData");
      }, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [groupToken, expiresAt]);
  return (
    <Router>
      <Suspense fallback={<Loader />}>
      <GroupContest.Provider
        value={{
          setGroupToken,
          setLogIn,
          setExpiresAt,
          logIn,
          expiresAt,
          userName,
          groupToken,
          setUserName,
          setSocket,
          activeUsers,
          setUsers,
        }}
      >
        <Switch>
          <Route path="/" exact={true} component={Join} />
          {logIn ? <Route path="/chat" exact={true} component={Chat} /> : null}
          <Route path="/create" exact={true} component={Createroom} />
          <Redirect to="/" />
        </Switch>
      </GroupContest.Provider>
      </Suspense>
    </Router>
  );
};

export default App;
