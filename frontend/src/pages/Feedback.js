import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Feedback.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const Feedback=()=>{

const navigate = useNavigate();
const [users, setUsers] = useState([]);
const [isEditing, setIsEditing] = useState(false);
const [editedUser, setEditedUser] = useState({});
const [file, setFile] = useState(null);
const [loading, setLoading] = useState(false);
const [res, setRes] = useState({});
const handleSelectFile = (e) => setFile(e.target.files[0]);
const [imageUrls, setImageUrls] = useState([]);
const [imgUP, setimgupload] = useState(false);
const [uploadSuccess, setUploadSuccess] = useState(false);

const [cookies, removeCookie] = useCookies([]);
const [username, setUsername] = useState("");
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);


// Event handler for password change request
// const handleChangePassword = () => {
//   // Send a request to the backend to change the password
//   axios
//     .put(`http://localhost:4042/change-password/${users._id}`, {
//       currentPassword,
//       newPassword,
//     })
//     .then((response) => {
//       setChangePasswordSuccess(true);
//       // Clear the password fields
//       setCurrentPassword("");
//       setNewPassword("");
//       // Display a success message
//       toast("Password changed successfully.", {
//         position: "top-right",
//       });
//     })
//     .catch((error) => {
//       // Handle password change error (e.g., invalid current password)
//       toast.error("Password change failed. Please try again.", {
//         position: "top-right",
//       });
//     });
// };

useEffect(() => {
  const verifyCookie = async () => {
    if (!cookies.token) {
      navigate("/login");
    }
    const { data } = await axios.post(
      "http://localhost:4042",
      {},
      { withCredentials: true }
    );
    const { status, user } = data;
    setUsername(user);
    return status
      ? toast(`Hello ${user}`, {
          position: "top-right",
        })
      : (removeCookie("token"), navigate("/login"));
  };
  verifyCookie();
}, [cookies, navigate, removeCookie]);
const Logout = () => {
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
      console.error(error);
      // Handle errors
    });
}, []);

useEffect(() => {
  // Fetch user data from your server
  axios
    .get("http://localhost:4042/dashbord", {
      withCredentials: true, //fix cookie problem
    })
    .then((response) => {
      setUsers(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}, []);

const handleEditClick = () => {
  setIsEditing(true);
  // Set the edited user data to the current user's data
  setEditedUser(users);
};

const handleDeleteClick = () => {
  // Show a confirmation dialog before deleting the account
  const confirmDelete = window.confirm(
    "Are you sure you want to delete your account?"
  );
  if (confirmDelete) {
    // Send a DELETE request to delete the user account
    axios
      .delete(`http://localhost:4042/delete/${users._id}`)
      .then(() => {
        // Redirect to the login page or perform any other necessary action
        // after the account is deleted
        // Example: history.push("/login");
      })
      .catch((error) => {
        console.error("Error deleting user account:", error);
      });
  }
};

const handleUpload = async () => {
  try {
    setLoading(true);
    const data = new FormData();
    data.append("my_file", file);
    const res = await axios.post("http://localhost:4042/upload", data, {
      withCredentials: true,
    });
    setRes(res.data);
    setUploadSuccess(true); // Image upload successful
    navigate("/home"); // Navigate to the dashboard
  } catch (error) {
    alert(error.message);
    console.log("There is an error!");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  axios
    .get("http://localhost:4042/image") // Fix the URL, add "http://"
    .then((response) => {
      const fetchedImageUrls = response.data;
      setImageUrls(fetchedImageUrls);
      // const filteredImages = imageUrls.filter(imageUrl => imageUrl.useremail === userEmail);
    })
    .catch((error) => {
      console.error(error);
      // Handle errors
    });
}, []);
const handleImgUpload = () => {
  setimgupload(true);
};

return (
  <div className="main-div">
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
      <button
        className="btn btn-success btn-update"
        onClick={handleImgUpload}
      >
        Update Profile Picture
      </button>
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
      <a href="/dashbord/payment" class="icon-a" id="btn3">
        <i class="fa fa-tv"></i> &nbsp;&nbsp;Payment History
      </a>
      <a href="/feedback" class="icon-a" id="btn4">
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
    </div>
    {/* ... (remaining code) */}
  </div>
);
};
export default Feedback;