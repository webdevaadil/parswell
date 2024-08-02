import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { Register } from './Component/Register';
import { Login } from "./Component/Login";
import { useDispatch } from "react-redux";
import { loaduser } from "./actions/UserAction";
import { AdminLogin } from "./Component/AdminLogin";
import { AdminDash } from "./Component/AdminDash";
import { Dashboard } from "./Component/Dashboard";
import { Home } from "./Component/Home";
import { User } from "./Component/User";
import { Profile } from "./Component/Profile";

function App() {
  const dispatch = useDispatch();
  dispatch(loaduser());
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          {/* <Route path="/registration" element={<Register />} /> */}
          {/* <Route path="/Login" element={<Login />} /> */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/AdminDash" element={<AdminDash />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
