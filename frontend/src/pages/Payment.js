import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Logout from "@mui/icons-material/Logout";
import { useCookies } from 'react-cookie';
const Payment = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [username, setUsername] = useState('');

  const [cookies, removeCookie] = useCookies(['token']);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      } else {
        try {
          const response = await axios.post(
            "http://localhost:4042", // Your API endpoint
            {},
            { withCredentials: true }
          );
          const { status, user } = response.data;
          setUsername(user);
          if (status) {
            // Toast notification code here
          } else {
            removeCookie("token");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error verifying cookie:", error);
        }
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  useEffect(() => {
    axios
      .get("http://localhost:4042/dashbord") // Fix the URL, add "http://"
      .then((response) => {
        const fetchedImageUrls = response.data;
        setImageUrls(fetchedImageUrls);
      })
      .catch((error) => {
        console.error("Error fetching image URLs:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4042/dashbord", {
        withCredentials: true, // Fix cookie problem
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return <div className="main-div">
  <button className="logoutbtn" onClick={Logout}>
    LOGOUT
  </button>
  <div id="mySidenav" class="sidenav">
    <p class="logo">
      <span>User</span> Profile
    </p>
    <a>
      {imageUrls.length > 0 && (
        <img
          className="img-x"
          style={{ width: "20vh", height: "20vh" }}
          src={
            imageUrls.length > 0 ? imageUrls[imageUrls.length - 1].url : ""
          } // Display the first image from the array
          alt={`Image 0`}
        />
      )}
      <p class="user-name"> {users.firstname + " " + users.lastname}</p>
    </a>

    {/* <Link to={"/dashbord"} class="icon-a" id="btn1"> */}
    
    {/* </Link> */}

    <a href="/dashbord" class="icon-a" id="btn1">
      <i class="fa fa-users icons"></i> &nbsp;&nbsp;Bidding History
    </a>
    <a
      href="/dashbord/agent"
      class="icon-a"
      id="btn2"
      onclick="changeContent()"
    >
      <i class="fa fa-video-camera"></i> &nbsp;&nbsp;Order History
    </a>
    <a href="/dashbordpayment" class="icon-a" id="btn3">
      <i class="fa fa-tv"></i> &nbsp;&nbsp;Payment History
    </a>
    <a href="" class="icon-a" id="btn4">
      <i class="fa fa-tasks icons"></i> &nbsp;&nbsp;Feedbacks
    </a>
  </div>
  <div id="main">
    <div class="head">
      <div class="col-div-6"></div>

      <div class="col-div-6">
        <div class="profile"></div>
      </div>
      <div class="clearfix"></div>
    </div>

    <div class="clearfix"></div>
    <br />
  </div>
  <div class="clearfix"></div>
  <br />
  <br />

  <div className="col-div-8" id="displayArea">
    <div className="user-profile">
      <h1 className="profile-title">{users.firstname} 's Profile</h1>

        

  </div>
  {/* ... (remaining code) */}
</div>
</div>
}
export default Payment;
