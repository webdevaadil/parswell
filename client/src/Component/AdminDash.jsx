import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import socket from "../Socket";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
export const AdminDash = () => {
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const [noti, setNoti] = useState()

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      if (user.role === "Admin") {
        navigate("/AdminDash");
      } else if (user.role === "User") {
        navigate("/Dashboard");
      }
    }
  }, [user]);
 
  useEffect(() => {
    // Listen for Socket.IO events
    socket.on("userCreated", (data) => {
      console.log("Received event:", data);
      
      // Update state or perform actions based on the received event
    });
    socket.on("selectproduct", (data) => {
      console.log("Received event:", data);
      setNoti(data.message)
      notifun()
      // Update state or perform actions based on the received event
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off("event");
    };
  }, []);

  const emitEvent = () => {
    socket.emit("event", { message: "Some event data" });
    // Emit Socket.IO event
  };
  const [userdata, setUserdata] = useState();
  const [email, setEmail] = useState();
  const [showtable, setshowtable] = useState(false);

  const submitform = async (e) => {
    e.preventDefault();
    const data = await axios.post("/api/auth/invite_user", { email: email });
    console.log(data.data);
    toast.success(data.data.message);
  };
  const getuserdetail = async () => {
    await axios.get("/api/auth/getuserrDetail").then((res) => {
      console.log(res.data);
      setUserdata(res.data);
    setshowtable(true)
      exportToCSV()
    });
  };
  const exportToCSV = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear(); // Get the current year
    const month = currentDate.getMonth() + 1; // Get the current month (add 1 since it's zero-based)
    const day = currentDate.getDate(); // Get the current day
    const hours = currentDate.getHours(); // Get the current hour
    const minutes = currentDate.getMinutes(); // Get the current minute
    const seconds = currentDate.getSeconds(); // Get the current second
    const formattedDateTime = `${year}-${month
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}_${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    // Convert the table into a worksheet
    const worksheet = XLSX.utils.table_to_sheet(
      document.querySelector(".table-bordered")
    );

    // Create a workbook and add the worksheet to it
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Convert the workbook to a buffer
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Create a Blob object from the buffer
    const blob = new Blob([buffer], { type: "application/octet-stream" });

    // Create a download link and click it to download the file
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `UserDetail_${formattedDateTime}.xlsx`;
    link.click();
    setshowtable(false)

  };
const [shownoti, Setshownoti] = useState(false)
const notifun=()=>{
  Setshownoti(true)
  setTimeout(() => {
    Setshownoti(false)

  }, 5000);
}
console.log(shownoti);
  return (
    <div>
      <div className="login" style={{flexDirection:"row"}}>
        <div>
          <h1>send invitation</h1>
          <form onSubmit={submitform}>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input type="submit" value="send invitation "
              style={{width:"130px",marginTop:"10px"}}
              className="btn btn-primary" />
          </form>
        </div>
        <button onClick={getuserdetail}  className="btn btn-info" >getuserrDetail</button>
        {
          shownoti=== true?(noti):("")
        }
      </div>
      <div className="table-bordered" style={{display:showtable===false?("none"):("block")}} >
        <table className="table">
          <tr>
            <th>Firstname</th>
            <th>lastname</th>
            <th>email</th>
            <th>Product</th>
          </tr>

          {userdata &&
            userdata.map((item, index) => {
              return (
                <>
                  <tr>
                    <td>{item?.Firstname}</td>
                    <td>{item?.lastname}</td>
                    <td>{item.email}</td>
                    <td>
                      <td>{item.product.join(", ")}</td>
                    </td>
                  </tr>
                </>
              );
            })}
        </table>
      </div>
    </div>
  );
};
