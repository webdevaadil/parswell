import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userregister } from "../actions/UserAction";
import style from "../Component/Css/Login.module.css";
import { toast } from "react-toastify";
export const Register = () => {
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated,user } = useSelector(
    (state) => state.user
  );
  const [userDetail, setUserDetail] = useState({
    Firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userregister(userDetail));
    
  };
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      if(user.success===true){
      console.log(user);
      toast.success ("Signup Successfull");
      navigate("/Dashboard");

    }
    }
    
  }, [user]);
  
  const handlechange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };
  const handle = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
    if(e.target.name=== "password"){

      setInterval(() => {
        const valued = e.target.value.trim();
        if (valued.length < 8) {
          setErrorMessage("Password is less 8 than");
        } else {
          setErrorMessage("");
        }
      }, 2000);
    }
  };
  function myFunction() {
    var x = document.getElementById("exampleInputPassword1");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  // dispatch(register({}))
  return (
    <>
      {/* <div  className="login">
      Registration 
      <form style={{width:"50%"}}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        autoComplete="new-password"
        className="form-floating mb-3"
      >
        <div className="form-floating"></div>
        <div className="form-floating mb-2">
          <input
            name="username"
            value={userDetail.username}
            onChange={handlechange}
            type="text"
            required
            className="form-control"
            autoComplete="off"
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating mb-2">
          <input
            onChange={handlechange}
            type="email"
            name="email"
            required
            value={userDetail.email}
            className="form-control"
            autoComplete="new-password"
          />
          <label htmlFor="floatingInput">Email Address</label>
        </div>

        <div className="form-floating mb-2">
          <input
            value={userDetail.password}
            required
            onChange={handle}
            name="password"
            type="password"
            className="form-control"
            id="myInput"
            autoComplete="new-password"
          />
          {errorMessage === "" ? null : (
            <span
              style={{
                fontWeight: "lighter",
                color: "red",
              }}
            >
              {errorMessage}
            </span>
          )}
          <i className="fa fa-eye" onClick={myFunction}></i>
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="fom-btn mb-3 mt-3">
          <Link to="/login" type="login" className="btn btn-outline-secondary">
            Login
          </Link>
          <input type="submit" value="Register"className="btn btn-outline-primary" />
        </div>
      </form>
    </div> */}
      <div className={`  ${style.logintop}`}>
        <div className={` ${style.logincontainer} container`}>
          {/* header */}
          <div className={` ${style.headers}`}>
            <div className={` ${style.Ellipse1}`}>Perswell</div>
            <div className={`  ${style.logotext}`}>
              <div className={`  ${style.Perswell}`}>Perswell</div>
              <div className={`  ${style.InvestInWhatMattersYourPeople}`}>
                Invest in what matters, your people
              </div>
            </div>

            {/* </div> */}
          </div>
          {/* header */}

          {/* center div */}
          <div className={` ${style.centerbox}`}>
            <div
              className="Line1"
              style={{
                width: "90%",
                border: "0.50px #FEFCFF solid",
              }}
            ></div>
            <h1 className={` ${style.WelcomeToPerswell}`}>
              Welcome to Perswell
            </h1>
            <div className={` ${style.Rectangle}`}>
              <form onSubmit={handleSubmit} className={` ${style.loginform}`}>
                <div className={` ${style.formheading}`}>
                  Log in to your account
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    placeholder="Firstname"
                    name="Firstname"
                    value={userDetail.Firstname}
                    onChange={handlechange}
                    autoComplete="new-password"
                    required
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    placeholder="lastname"
                    name="lastname"
                    value={userDetail.lastname}
                    onChange={handlechange}
                    autoComplete="new-password"
                    required
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="email"
                    placeholder="Work Email"
                    name="email"
                    value={userDetail.email}
                    onChange={handlechange}
                    autoComplete="new-password"
                    required
                  />
                </div>
                <div class="mb-4"  style={{ display: "flex", width: "inherit" ,
    "marginLeft": "-40px",
}}>
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
                  <i className="fa fa-eye"aria-hidden="true"   style={{ margin: "6px -31px" }} onClick={myFunction}></i>
                </div>
                  {errorMessage === "" ? null : (
                    <span
                      style={{
                        fontWeight: "lighter",
                        color: "red",
                      }}
                    >
                      {errorMessage}
                    </span>
                  )}
                 
                <input
                  type="submit"
                  value=" Sign up"
                  class={`${style.submitbutton} `}
                />
                <div>
                  Already a member?{" "}
                  <Link
                    className="CreateAccount"
                    to="/"
                    style={{
                      textAlign: "center",
                      color: "#1F1F1F",
                      fontSize: 16,
                      fontFamily: "Poppins",
                      fontWeight: "400",
                      wordWrap: "break-word",
                    }}
                  >
                    Log in
                  </Link>{" "}
                </div>

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
    </>
  );
};
