import React from "react";
import "./styles/frame.scss";

const Model = ({ Token, Title, Desc, Btn, fun }) => {
  return (
    <>
      <div className="Model"></div>
      <section className="container">
        <div class="card">
          <div className="header">
            <h2>{Title}</h2>
          </div>
          <div className="desc">
            <h7>{Desc}</h7>
          </div>
          {Token ? (
            <div className="token_container">
              <div className="token">
                <h7>{Token}</h7>
              </div>
            </div>
          ) : null}
          <div className="btn_container">
            <div
              className="btn"
              onClick={() => {
                fun();
              }}
            >
              <h7>{Btn}</h7>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Model;
