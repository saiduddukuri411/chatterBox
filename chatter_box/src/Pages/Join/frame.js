import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Styles/frame.scss";
import { useFormHook } from "../hooks/formHook";
import Input from "./components/input";

const JoinFrame = () => {
  const [name, setname] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [values, onChangeHandler] = useFormHook({
    group: "",
    user: "",
    password: "",
  });
  const checker = () => {
    return values.group && values.user && values.password;
  };

  const history = useHistory();
  const navigate = () => {
    history.push("/create");
  };
  return (
    <section className="join_container">
      <div className="login_frame">
        <div className="header">
          <h3>Connect</h3>
        </div>
        <Input
          type="text"
          name="group"
          holder="Group Id"
          handler={onChangeHandler}
          value={values.group}
        />
        <Input
          type="text"
          name="user"
          holder="Screen Name"
          handler={onChangeHandler}
          value={values.user}
        />
        <Input
          type="password"
          name="password"
          holder="Password"
          handler={onChangeHandler}
          value={values.password}
        />

        <div className="button_container">
          <button className="button" disabled="true">
            SignIn
          </button>
          <div className={checker() ? "cover remove" : "cover"}></div>
        </div>

        <div className="button_container">
          <button className="extra_button" onClick={navigate}>
            Create A Room
          </button>
        </div>
      </div>
    </section>
  );
};
export default JoinFrame;
