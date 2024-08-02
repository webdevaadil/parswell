import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const User = () => {
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user);
      if (user.role === "Admin") {
        navigate("/AdminDash");
      }
    } else {
      navigate("/");
    }
  }, [user]);
  console.log(user);
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link " to="/Dashboard">
                Dashboard
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link " to="/user">
                User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <h1>My Account</h1>
      {user && (
        <div className="userbox">
          <div
            className="box"
            style={{
              justifyContent: "flex-start",
            }}
          >
            <div className="userlogo">logo</div>
            <h1> {user.username}</h1>{" "}
          </div>
          <div
            className="box"
            style={{
              justifyContent: "flex-start",
            }}
          >
            <h1>Subscription</h1>
            <div className="userlogo">logo</div>
            <h1> {user.product[0]}</h1>{" "}
          </div>
        </div>
      )}
    </div>
  );
};
