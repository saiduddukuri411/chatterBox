import React from "react";
import "./styles/single.scss";
import { GroupContest } from "../../userContest";
import ReactEmoji from 'react-emoji';


const Signleframe = ({ message, name }) => {
  const { userName } = React.useContext(GroupContest);
  let trimmedName = userName.trim().toLowerCase();
  if (trimmedName === name) {
    return (
      <div className="second_container">
        <div className="secMsgContainer">
          <h7 className="sec_msg">{ReactEmoji.emojify(message)}</h7>
        </div>
      </div>
    );
  }
  return (
    <div className="first_container">
    <div className="mess_frame">
      <h7 className="from">{`@${name}`}</h7>
      <div className={name==="admin"?"msg_div red_bg":"msg_div"}>
        <h7 className="user_msg">{ReactEmoji.emojify(message)}</h7>
      </div>
    </div>
    </div>
  );
};
export default Signleframe;
