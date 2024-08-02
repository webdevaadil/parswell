import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminlogin } from "../actions/UserAction";
import { toast } from "react-toastify";
import style from "../Component/Css/Login.module.css";
import perswell_logo from "./Assets/logo.png";

export const AdminLogin = () => {
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminlogin(userDetail));
  };
  const handlechange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };
  const handle = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
    setInterval(() => {
      const valued = e.target.value.trim();
      if (valued.length < 8) {
        setErrorMessage("Password is less 8 than");
      } else {
        setErrorMessage("");
      }
    }, 2000);
  };
  function myFunction() {
    var x = document.getElementById("exampleInputPassword1");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      console.log(user);
      if (user.role === "Admin") {
        toast.success("Login Successfull");
        navigate("/AdminDash");
      } else if (user.role === "User") {
        toast.success("Login Successfull");
        navigate("/Dashboard");
      }
    }
    if (isAuthenticated === "true") {
      if (user.role === "Admin") {
        navigate("/AdminDash");
      } else if (user.role === "User") {
        toast.success("Login Successfull");
        navigate("/Dashboard");
      }
    }
    if(error){
      console.log(error);
      toast.error(error)
    }
  }, [user, isAuthenticated]);
  return (
    <div>
      <div className={`  ${style.logintop}`}>
        <div className={` ${style.logincontainer} container`}>
          {/* header */}
          <div className={` ${style.headers}`}>
            {/* <div className={` ${style.Ellipse1}`}>Perswell</div> */}
            {/* <div className={`  ${style.logotext}`}>
          <div className={`  ${style.Perswell}`}>Perswell</div>
          <div className={`  ${style.InvestInWhatMattersYourPeople}`}>
            Invest in what matters, your people
          </div>
        </div> */}
            <img
              src={perswell_logo}
              alt="loading..."
              className={style.logo_img}
            />
          </div>
          {/* header */}

          {/* center div */}
          <div className={` ${style.centerbox}`}>
            <div
              className="Line1"
              style={{
                width: "100%",
                border: "0.50px #FEFCFF solid",
              }}
            ></div>
            <h1 className={` ${style.WelcomeToPerswell}`}>
              Welcome to Perswell
            </h1>
            <div className={` ${style.Rectangle}`}>
              <form onSubmit={handleSubmit} className={` ${style.loginform}`}>
                <div className={` ${style.formheading}`}>
                  Log in to your Admin account
                </div>
                <div class="mb-4 mt-4">
                  <label
                    htmlFor=""
                    style={{ display: "flex", width: "inherit" }}
                  >
                    <input
                      type="email"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Work Email"
                      name="email"
                      value={userDetail.email}
                      onChange={handlechange}
                      autoComplete="new-password"
                      required
                      className={style.custom_input}
                    />
                  </label>
                </div>
                <div
                  class="mb-4"
                  style={{
                    display: "flex",
                    width: "inherit",
                    marginLeft: "-40px",
                  }}
                >
                  <input
                    placeholder="Password"
                    type="password"
                    id="exampleInputPassword1"
                    required
                    onChange={handle}
                    value={userDetail.password}
                    name="password"
                    autoComplete="new-password"
                    className={style.custom_input}
                  />
                  <i
                    className="fa fa-eye"
                    aria-hidden="true"
                    style={{ margin: "6px -31px" }}
                    onClick={myFunction}
                  ></i>
                </div>
                {errorMessage === "" ? null : (
                  <p class={`${style.errorText} `}>{errorMessage}</p>
                )}
                <input
                  type="submit"
                  value=" Log in"
                  class={`${style.submitbutton} `}
                />
                {/* <button type="submit" className={`btn ${style.submitbutton} `}>
              Log in
            </button> */}

                <div
                  className="Group9"
                  style={{
                    width: 150.25,
                    height: 40.9,
                    left: 645,
                    top: 587,
                  }}
                ></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
