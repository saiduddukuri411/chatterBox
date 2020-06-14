import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Styles/frame.scss";
import { useFormHook } from "../hooks/formHook";
import Input from "./components/input";
import httpHook from "../hooks/httpHook";
import Loader from "../Models/Loader/frame";
import Model from "../Models/ErrTokenModel/frame";

const JoinFrame = () => {
  const { isLoading, Errors, clearErr, sendRequest } = httpHook();
  const [name, setname] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [signedIn, setSignedIn] = React.useState(null);
  let history = useHistory();
  const navigate = () => {
    history.push("/");
  };
  const [values, onChangeHandler] = useFormHook({
    group: "",
    user: "",
    password: "",
  });
  const [verify, setverify] = React.useState({
    group: false,
    user: false,
    password: false,
  });
  const formValidationHandler = () => {
    return (
      verify.group &&
      verify.user &&
      verify.password &&
      values.user === values.password
    );
  };
  const signInHandler = async () => {
    let responseData;
    try {
      console.log("req", process.env.REACT_APP_BACKEND_URL);
      responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        "POST",
        JSON.stringify({
          name: values.group,
          password: values.user,
          retype: values.password,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      if (responseData) {
        setSignedIn((prev) => responseData.groupId);
      }
    } catch (err) {}
  };
  return (
    <section className="join_container">
      <div className="login_frame">
        <div className="header">
          <h3>Create Room</h3>
        </div>
        <Input
          type="text"
          name="group"
          holder="Admin Name"
          handler={onChangeHandler}
          value={values.group}
          verify="REQUIRED"
          error="Required"
          overall={setverify}
        />
        <Input
          type="password"
          name="user"
          holder="Password"
          handler={onChangeHandler}
          value={values.user}
          verify="MIN"
          error="Atleast 6 Charecters"
          overall={setverify}
        />
        <Input
          type="password"
          name="password"
          holder="Retype Password"
          handler={onChangeHandler}
          value={values.password}
          reverify={values.user}
          error="Password Mismatch"
          overall={setverify}
        />

        <div className="button_container">
          <button className="button" onClick={signInHandler}>
            Create
          </button>
          {formValidationHandler() ? null : <div className="cover"></div>}
        </div>

        <div className="button_container">
          <button className="extra_button" onClick={navigate}>
            Go SignIn
          </button>
        </div>
      </div>
      {isLoading ? <Loader /> : null}
      {signedIn ? (
        <Model
          Token={signedIn}
          Title="Group Token"
          Desc="Use below group id. It expires in 4 hours."
          Btn="LogIn"
          fun={navigate}
        />
      ) : null}
      {Errors ? (
        <Model
          Title="An Error Occured"
          Desc={Errors}
          Btn="Back"
          fun={clearErr}
        />
      ) : null}
    </section>
  );
};
export default JoinFrame;
