import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashbord.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const Dashboard = () => {
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
              src={imageUrls[0].url} // Display the first image from the array
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
        <a href="" class="icon-a" id="btn3">
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
          {imgUP ? (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleSelectFile}
                style={{ display: "block" }}
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="custom-file-input"
                style={{
                  display: "block",
                  padding: "10px 15px",
                  backgroundColor: "#3498db",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                  textAlign: "center",
                  maxWidth: "200px",
                  margin: "0 auto",
                }}
              >
                Choose an Image
              </label>
              <button
                className="btn btn-success"
                style={{
                  marginTop: "10px",
                  backgroundColor: "green",
                  color: "white",
                }}
                onClick={() => {
                  console.log("Button clicked");
                  setimgupload(true);
                  handleUpload();
                }}
              >
                Save Changes
              </button>
              <button
                className="btn btn-danger"
                style={{
                  marginTop: "10px",
                  backgroundColor: "red",
                  color: "white",
                }}
                onClick={() => {
                  console.log("Cancel clicked");
                  setimgupload(false); // Set imgUP back to false to cancel the image upload
                }}
              >
                Cancel
              </button>
            </div>
          ) : isEditing ? (
            // Display the edit form when isEditing is true
            <div className="edit-profile-form">
              {/* Edit form fields */}
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  value={editedUser.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>firstname</label>
                <input
                  type="text"
                  value={editedUser.firstname}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, firstname: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>lastname</label>
                <input
                  type="text"
                  value={editedUser.lastname}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, lastname: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Age:</label>
                <input
                  type="text"
                  value={editedUser.age}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, age: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  value={editedUser.address}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, address: e.target.value })
                  }
                />
              </div>
              {/* Add similar fields for other user properties (address, age, etc.) */}
              <button className="btn btn-success" onClick={handleSaveClick}>
                Save Changes
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            // Display user details when not editing
            <div className="profile-info">
              <p>
                <strong>Email:</strong> {users.email}
              </p>
              <p>
                <strong>Firstname:</strong> {users.firstname}
              </p>
              <p>
                <strong>Lastname:</strong> {users.lastname}
              </p>
              <p>
                <strong>Age:</strong> {users.age}
              </p>
              <p>
                <strong>Address:</strong> {users.address}
              </p>

              {/* Display other user details here */}
            </div>
          )}

          {!isEditing && !imgUP && (
            <div className="button-container">
              <button
                className="btn btn-primary btn-editA"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
              <button className="btn btn-danger" onClick={handleDeleteClick}>
                Delete my account
              </button>
            </div>
          )}
        </div>
      </div>
      {/* ... (remaining code) */}
    </div>
  );
};
export default Dashboard;
