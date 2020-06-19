import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Styles/frame.scss";
import { useFormHook } from "../hooks/formHook";
import Input from "./components/input";
import httpHook from "../hooks/httpHook";
import Loader from "../Models/Loader/frame";
import Errormodel from "../Models/ErrTokenModel/frame";
import { GroupContest } from "../../userContest";

const JoinFrame = () => {
  const {
    setLogIn,
    setGroupToken,
    setExpiresAt,
    logIn,
    setUserName,
    userName
  } = React.useContext(GroupContest);
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
        setLogIn((prev) => true);
        setGroupToken((prev) => response_data.token);
        setExpiresAt((prev) => new Date(response_data.expiresin));
        setUserName(prev=>values.user)
        localStorage.setItem(
          "userData",
          JSON.stringify({
            token: response_data.token,
            expiration: new Date(response_data.expiresin).toISOString(),
            userName:values.user,
          })
        );
      }
    } catch (err) {}
  };
  const NavigateChat = () => {
    history.push("/chat");
  };
  React.useEffect(() => {
    if (logIn) {
      NavigateChat();
    }
  }, [userName]);
  return (
    <>
      {isLoading ? <Loader /> : null}
      {Errors ? (
        <Errormodel
          Title="An Error Occured"
          Desc={Errors}
          Btn="Back"
          fun={clearErr}
        />
      ) : null}
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
    </>
  );
};
export default JoinFrame;
