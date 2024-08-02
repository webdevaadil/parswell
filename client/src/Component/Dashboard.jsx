import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logout, selectproduct } from "../actions/UserAction";
import socket from "../Socket";
import stylelogin from "../Component/Css/Login.module.css";
import styledashboard from "../Component/Css/Dashboard.module.css";

import perswell_logo from "./Assets/logo.png";
import arrawdown from "./Assets/arrowdown.svg";
import svg1 from "./Assets/svg1.svg";
import svg2 from "./Assets/svg2.svg";
import svg3 from "./Assets/svg3.svg";
import svg4 from "./Assets/svg4.svg";
import svg5 from "./Assets/svg5.svg";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const dummyArray = [
  { id: 1, icon: `${svg1}`, label: "Mental Health" },
  { id: 2, icon: `${svg2}`, label: "Physical Fitness" },
  { id: 3, icon: `${svg3}`, label: "Healthy Lifestyle" },
  { id: 4, icon: `${svg4}`, label: "Personal Growth" },
  { id: 5, icon: `${svg5}`, label: "Parenthood" },
];

const items = ["Meditation", "Sleep", "Lower Stress", "Lower Anxiety"];

export const Dashboard = () => {
  const [rowId, setRowId] = React.useState("");
  const [show, setshow] = React.useState("");
  const [isDropdown, setDropdown] = React.useState(false);

  const handleOpen = () =>{
    dispatch(logout());
    navigate("/");
    toast.info("Logout")
  }

  const handleClick = (event, id) => {
    setRowId(id);
    setshow(true);
  };


  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // console.log(user);
      if (user.role === "Admin") {
        navigate("/AdminDash");
      }
    } else {
      navigate("/");
    }
  }, [user]);

  const dispatch = useDispatch();
  const select_product = async (product) => {
    setRowId('');
    const config = { headers: { "Content-Type": "Application/json" } };
    const data = await axios.post(
      "/api/auth/selectProduct",
      { product:product },
      config
    );
    console.log(data);
    if (data.data) {
      alert(data.data.message);
    }
  };

  const listItems = items.map((item) => (
    <li className={styledashboard.list}>{item}</li>
  ));

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
        <div className="d-flex  justify-content-center align-items-center">
          <div className="user me-3">
            <p className={`mb-0 ${styledashboard.welcome_text}`}>Welcome</p>
            <h6 className={styledashboard.user_name}>{user?.email}</h6>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setDropdown(!isDropdown)}
          >
            <div className={`${styledashboard.profile}`}>
              <img src={arrawdown} alt="" />
              {isDropdown && (
                <div className={`${styledashboard.custom_dropdown}`}>
                  <a className="" href="/profile">
                    Profile
                  </a>
                  <a className="" onClick={handleOpen}>
                    Signout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div
        className="Line1 mt-2"
        style={{
          width: "100%",
          border: "0.50px #FEFCFF solid",
        }}
      ></div>
      <div className="login">
        <p className={`mb-4 ${styledashboard.select_para}`}>
          Select your Free Subscription
        </p>

        <div className={`product row mx-2 ${styledashboard.custom_card}`}>
          {dummyArray.map((row) => (
            <div className="col-lg-4 col-md-6 col-12 my-4 px-4">
              <div className={` ${styledashboard.custom_box}`}>
                <div className={`mb-2 ${styledashboard.custom_logobox}`}>
                  <img src={row?.icon} alt="" />
                </div>
                <div className="px-4">
                  <div className="row">
                    <div className="col-12 mb-2">
                      {row.id !== rowId && (
                        <>
                          {" "}
                          <h1 className="">{row?.label}</h1>
                          <button
                            type="button"
                            className="btn secondary_btn"
                            onClick={(event) => handleClick(event, row.id)}
                          >
                            more Info
                          </button>
                        </>
                      )}
                      {row.id === rowId && (
                        <div className={styledashboard.custom_popup}>
                          <ul className="mb-0">{listItems}</ul>
                        </div>
                      )}
                    </div>
                    <div className="col-12 mt-3">
                      <button
                        className="btn  primary_btn"
                        onClick={() => {
                          const confirmBox = window.confirm("Select product");
                          if (confirmBox === true) {
                            // handleDeleteCrumb(bookmark)
                            console.log("dasdas");
                            select_product(row?.label);
                          }
                        }}
                      >
                        {" "}
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="product">
          <div className="box">
            <div className="logo">logo</div>
            <h1>mental health</h1>
            <button className="btn btn-primary">more Info</button>
            <button
              className="btn btn-warning"
              onClick={() => {
                const confirmBox = window.confirm("Select product");
                if (confirmBox === true) {
                  // handleDeleteCrumb(bookmark)
                  console.log("dasdas");
                  select_product();
                }
              }}
            >
              {" "}
              Select
            </button>
          </div>
          <div className="box">
            {" "}
            <div className="logo">logo</div>
            <h1>Phyiscal Fitness</h1>
            <button className="btn btn-primary">more Info</button>
            <button
              className="btn btn-warning"
              onClick={() => {
                const confirmBox = window.confirm("Select product");
                if (confirmBox === true) {
                  // handleDeleteCrumb(bookmark)
                  console.log("dasdas");
                  select_product();
                }
              }}
            >
              {" "}
              Select
            </button>{" "}
          </div>
          <div className="box">
            {" "}
            <div className="logo">logo</div>
            <h1>Helthy Lifestyle</h1>
            <button className="btn btn-primary">more Info</button>
            <button
              className="btn btn-warning"
              onClick={() => {
                const confirmBox = window.confirm("Select product");
                if (confirmBox === true) {
                  // handleDeleteCrumb(bookmark)
                  console.log("dasdas");
                  select_product();
                }
              }}
            >
              {" "}
              Select
            </button>{" "}
          </div>
          <div className="box">
            {" "}
            <div className="logo">logo</div>
            <h1>Personal Growth</h1>
            <button className="btn btn-primary">more Info</button>
            <button
              className="btn btn-warning"
              onClick={() => {
                const confirmBox = window.confirm("Select product");
                if (confirmBox === true) {
                  // handleDeleteCrumb(bookmark)
                  console.log("dasdas");
                  select_product();
                }
              }}
            >
              {" "}
              Select
            </button>{" "}
          </div>
          <div className="box">
            {" "}
            <div className="logo">logo</div>
            <h1>Parenthood</h1>
            <button className="btn btn-primary">more Info</button>
            <button
              className="btn btn-warning"
              onClick={() => {
                const confirmBox = window.confirm("Select product");
                if (confirmBox === true) {
                  // handleDeleteCrumb(bookmark)
                  console.log("dasdas");
                  select_product();
                }
              }}
            >
              {" "}
              Select
            </button>{" "}
          </div>
        </div> */}
      </div>
    </div>
  );
};
