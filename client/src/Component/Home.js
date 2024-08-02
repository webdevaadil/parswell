import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <nav class="navbar navbar-expand-lg navbar-light ">
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <li>
                  <Link class="nav-link" to="/">
                    Login
                  </Link>
                </li>
              </li>
              <li class="nav-item">
                <li>
                  <Link class="nav-link" to="/adminlogin">
                    adminLogin
                  </Link>
                </li>
              </li>
              <li class="nav-item">
                <li>
                  <Link class="nav-link" to="/registration">
                    Registration
                  </Link>
                </li>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};
