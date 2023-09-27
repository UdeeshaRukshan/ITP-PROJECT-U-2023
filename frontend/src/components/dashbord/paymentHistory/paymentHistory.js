import React, { useState, useEffect } from "react";
import axios from "axios";

import "../paymentHistory/paymentHistory.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const paymentHistory = () => {
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

  const handleSaveClick = () => {
    // Send a PUT request to update the user data on the server
    axios
      .put(`http://localhost:4042/update/${users._id}`, editedUser)
      .then((response) => {
        // Update the state with the updated user data
        setUsers(response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
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
      <div id="mySidenav" class="sidenav">
        <p class="logo">
          <span>User</span> Profile
        </p>
        <a>
          {imageUrls.length > 0 && (
            <img
              className="img-x"
              style={{ width: "20vh", height: "20vh" }}
              src={imageUrls[0].url} // Display the first image from the array
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
        <a href="/paymenthistory" class="icon-a" id="btn3">
          <i class="fa fa-tv"></i> &nbsp;&nbsp;Payment History
        </a>
        <a href="/feedbacks" class="icon-a" id="btn4">
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

      <div className="col-div-8" id="displayArea"></div>
    </div>
  );
};
export default paymentHistory;
