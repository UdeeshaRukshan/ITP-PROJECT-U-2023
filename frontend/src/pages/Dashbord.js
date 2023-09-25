import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashbord.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

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

  return (
    <div>
      <div id="mySidenav" class="sidenav">
        <p class="logo">
          <span>User</span> Profile
        </p>
        <a>
          <img />
          <p class="user-name"> Udeesha Rukshan</p>
        </a>
        <Link to={"/dashbord"} class="icon-a" id="btn1">
          <i class="fa fa-dashboard icons"></i> &nbsp;&nbsp; Profile
        </Link>

        <a href="" class="icon-a" id="btn1">
          <i class="fa fa-users icons"></i> &nbsp;&nbsp;Bidding History
        </a>
        <a href="Movie.jsp" class="icon-a" id="btn2" onclick="changeContent()">
          <i class="fa fa-video-camera"></i> &nbsp;&nbsp;Order History
        </a>
        <a href="Tvshow.jsp" class="icon-a" id="btn3">
          <i class="fa fa-tv"></i> &nbsp;&nbsp;Payment History
        </a>
        <a href="DisplayFeedback.jsp" class="icon-a" id="btn4">
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
          <h1 className="profile-title">{users.username}'s Profile</h1>
          {isEditing ? (
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
                <label>Username:</label>
                <input
                  type="text"
                  value={editedUser.username}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, username: e.target.value })
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
            </div>
          ) : (
            // Display user details when not editing
            <div className="profile-info">
              <p>
                <strong>Email:</strong> {users.email}
              </p>
              <p>
                <strong>Username:</strong> {users.username}
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
          <div className="button-container">
            {!isEditing && (
              // Show the Edit Profile button when not editing
              <button className="btn btn-primary" onClick={handleEditClick}>
                Edit Profile
              </button>
            )}
            <button className="btn btn-danger" onClick={handleDeleteClick}>
              Delete my account
            </button>
          </div>
        </div>
      </div>
      {/* ... (remaining code) */}
    </div>
  );
};

export default Dashboard;
