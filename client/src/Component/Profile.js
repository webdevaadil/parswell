import React from "react";
import stylelogin from "../Component/Css/Login.module.css";
import profileStyle from "../Component/Css/Profile.module.css";
import perswell_logo from "./Assets/logo.png";
import noImg from "./Assets/img1.png";

export const Profile = () => {
  return (
    <div className="container">
      <header>
        <div className={` ${stylelogin.headers}`}>
          <img
            src={perswell_logo}
            alt="loading..."
            className={stylelogin.logo_img}
          />
        </div>
      </header>
      <div
        className="Line1 mt-2"
        style={{
          width: "100%",
          border: "0.50px #FEFCFF solid",
        }}  
      ></div>
      <div className="my-5">
        <div className="row py-5">
          <div className="col-lg-6 col-12">
            <div className={profileStyle.card}>
            <img src={noImg} alt=""  className={`img-fluid ${profileStyle.no_img}`}/>
                <h6 className="my-3">Anurag Pandey</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
