import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Styles/frame.scss";
import { useFormHook } from "../hooks/formHook";
import Input from "./components/input";
import httpHook from "../hooks/httpHook";
import Loader from '../Models/Loader/frame';
import Errormodel from '../Models/ErrTokenModel/frame';

const JoinFrame = () => {
  const { isLoading, Errors, clearErr, sendRequest } = httpHook();
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

  const signInHandler = async () => {
    console.log(values);
    try {
      const response_data = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        "POST",
        JSON.stringify({
          groupId: values.group,
          name: values.user,
          password: values.password,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      if (response_data) {
        console.log(response_data);
      }
    } catch (err) {}
  };
  if (Errors) {
    console.log(Errors);
  }
  return (
    <>
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
          <button className="button" onClick={signInHandler}>
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
    {isLoading?<Loader />:null}
    </>
  );
};
export default JoinFrame;
