import React from "react";
import { GroupContest } from "../../userContest";
import { useHistory } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import "./styles/frame.scss";
import Model from "../Models/ErrTokenModel/frame";
import io from "socket.io-client";
import {BsFillPersonLinesFill} from 'react-icons/bs';
import Message from "../Messages/frame";
import Sidedrawer from './components/sidedrawer';
let socket;

const ChatFrame = () => {
  const { logIn, expiresAt, userName, groupToken } = React.useContext(
    GroupContest
  );
  const [drawer,setDrawer]=React.useState(false);
  const drawerHandler=()=>{
    setDrawer(prev=>true)
  }
  const {
    setExpiresAt,
    setLogIn,
    setGroupToken,
    setUserName,
    setSocket,
    setUsers
  } = React.useContext(GroupContest);
  const [show, useShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [name, setName] = React.useState([]);
  const leftTime = (
    (new Date(expiresAt).getTime() - new Date().getTime()) /
    60000
  ).toFixed(2);
  const ClearModel = () => {
    useShow((prev) => false);
  };
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;
  const logOutUser=()=>{
    socket = io(ENDPOINT);
    socket.emit("disconnect");
  }
  React.useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { userName, token: groupToken }, () => {});
    setSocket(prev=>socket)
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT]);
  React.useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message.text]);
      setName((prev) => [...prev, message.user]);
      setUsers(message.active)
    });
  }, []);
  React.useEffect(() => {
    const NavigateHome = () => {
      useHistory().push("/");
    };
    if (!logIn) {
      NavigateHome();
    }
  }, [logIn]);
  React.useEffect(() => {
    const Trigger = () => {
      useShow((prev) => true);
    };
    Trigger();
  }, []);
  const CloseChat = () => {
    setTimeout(()=>{
      logOutUser();
    },5000)
    setLogIn((prev) => false);
    setGroupToken((prev) => null);
    setExpiresAt((prev) => null);
    setUserName((prev) => null);
    localStorage.removeItem("userData");
  };
  const inputChange = (event) => {
    setMessage(event.target.value);
  };
  const sendMessage = (event) => {
    socket.emit("sendMesssage", message, () => {
      setMessage((prev) => "");
    });
  };
  return (
    <>
      {show ? (
        <Model
          Title="Ends By"
          Desc={`Your chats ends by ${leftTime} Minutes`}
          Btn="Back"
          fun={ClearModel}
        />
      ) : null}
      <div className="chat_container">
        <div className="chate_frame">
          <header className="chat_header">
            <BsFillPersonLinesFill className="online_users" onClick={drawerHandler}/>
            <h7>CHATTER BOX</h7>
            <div className="closer" onClick={CloseChat}>
              <h7>CLOSE</h7>
            </div>
          </header>
          {name ? <Message messages={messages} name={name} /> : null}
          <div className="message_box">
            <input
              type="text"
              className="msg_input"
              placeholder="Type a message..."
              value={message}
              onChange={inputChange}
              onKeyPress={(event) =>
                event.key === "Enter" ? sendMessage() : null
              }
            />
            <IoIosSend className="send_item" onClick={sendMessage} />
          </div>
          {drawer?<Sidedrawer set={setDrawer} names={name}/>:null}
        </div>
        
      </div>
    </>
  );
};

export default ChatFrame;
