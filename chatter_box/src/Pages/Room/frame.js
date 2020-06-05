import React from "react";
import { Link,useHistory } from "react-router-dom";
import "./Styles/frame.scss";
import { useFormHook } from "../hooks/formHook";
import Input from "./components/input";

const JoinFrame = () => {
  const [name, setname] = React.useState("");
  const [room, setRoom] = React.useState("");
  let history=useHistory();
  const navigate=()=>{
    history.push('/')
  }
  const [values, onChangeHandler] = useFormHook({
    group: "",
    user: "",
    password: "",
  });
  const [verify,setverify]=React.useState({
    group: false,
    user: false,
    password: false
  }) 
  
  const formValidationHandler=()=>{
    return verify.group && verify.user && verify.password;
  }
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
          verify='REQUIRED'
          error="Required"
          overall={setverify}
        />
        <Input
          type="password"
          name="user"
          holder="Password"
          handler={onChangeHandler}
          value={values.user}
          verify='MIN'
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
          <button className="button" disabled="true">
            Create
          </button>
          {formValidationHandler()?null:<div className="cover"></div>}
          
        </div>

        <div className="button_container">
          <button className="extra_button" onClick={navigate}>
            Go SignIn
          </button>
        </div>
      </div>
    </section>
  );
};
export default JoinFrame;
