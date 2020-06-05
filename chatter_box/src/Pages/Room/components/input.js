import React from "react";
import "../Styles/input.scss";

const Input = React.memo(
  ({
    type,
    name,
    holder,
    handler,
    value,
    error,
    verify,
    reverify,
    overall
  }) => {
      
    const [blur, setblur] = React.useState(false);
    const [valid, setvalidation] = React.useState(false);
    const blurHandler = () => {
      setblur((prev) => {
        return true;
      });
    };
   React.useEffect(()=>{
      overall((prev)=>{
          return({...prev,[name]:valid})
      })
   },[valid])
    React.useEffect(() => {
      if (verify) {
        if (verify === "REQUIRED") {
          value.length > 0
            ? setvalidation((prev) => true)
            : setvalidation((prev) => false);
        } else {
          value.length >= 6
            ? setvalidation((prev) => true)
            : setvalidation((prev) => false);
        }
      } else {
        reverify === value && value!==''
          ? setvalidation((prev) => true)
          : setvalidation((prev) => false);
      }
    }, [value]);
    return (
      <section className="input_container">
        <input
          className="input"
          type={type}
          name={name}
          placeholder={holder}
          value={value}
          onChange={handler}
          onBlur={blurHandler}
        />
        {blur ? valid ? null : <p className="error">{error}</p> : null}
      </section>
    );
  }
);

export default Input;
