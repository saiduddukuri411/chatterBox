import React from "react";
import "../styles/sidedrawer.scss";
import { GrClose } from "react-icons/gr";
import { GroupContest } from "../../../userContest";
import ScrollToBottom from "react-scroll-to-bottom";
import {BsDot} from 'react-icons/bs';

const Sidedrawer = ({ set, names }) => {
  const { activeUsers } = React.useContext(GroupContest);
  console.log(activeUsers, "active");
  return (
    <div className="drawer_container">
      <div className="drawer_header">
        <GrClose
          className="closer"
          onClick={() => {
            set((prev) => false);
          }}
        />
      </div>
      <ScrollToBottom className="activ_container">
          {activeUsers.map(lis=>(
              <div key={lis.id} className="user_div">
              <h7>{lis.name}</h7>
              <BsDot className="dot"/>
            </div>
          ))}
        
      </ScrollToBottom>
    </div>
  );
};
export default Sidedrawer;
