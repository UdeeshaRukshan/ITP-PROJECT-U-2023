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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  // Event handler for new password input
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/; // Only alphabetic characters allowed
    return nameRegex.test(name);
  };

  const validateAge = (age) => {
    const parsedAge = parseInt(age);
    return !isNaN(parsedAge) && parsedAge >= 18; // Age validation: must be a number and at least 18 years old
  };
  const validateSriLankanNIC = (nic) => {
    // Sri Lankan NIC format: 123456789V or 123456789X
    const nicRegex = /^\d{9}[VX]$/;
    return nicRegex.test(nic.toUpperCase());
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Copy the previous errors and remove the error for the current field
    const updatedErrors = { ...errors };
    delete updatedErrors[name];

    // Update the editedUser state
    setEditedUser({ ...editedUser, [name]: value });

    // Validate the field and update errors if necessary
    if (name === "email" && !validateEmail(value)) {
      updatedErrors[name] = "Invalid email format";
    } else if (
      (name === "firstname" || name === "lastname") &&
      !validateName(value)
    ) {
      updatedErrors[name] = "Only alphabetic characters allowed";
    } else if (name === "age" && !validateAge(value)) {
      updatedErrors[name] = "Age must be a number and at least 18";
    } else if (name === "id" && !validateSriLankanNIC(value)) {
      updatedErrors[name] = "Invalid Sri Lankan NIC format";
    }

    // Update the errors state
    setErrors(updatedErrors);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form before submitting
    const newErrors = {};
    if (!validateEmail(editedUser.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!validateName(editedUser.firstname)) {
      newErrors.firstname = "Only alphabetic characters allowed";
    }
    if (!validateName(editedUser.lastname)) {
      newErrors.lastname = "Only alphabetic characters allowed";
    }
    if (!validateAge(editedUser.age)) {
      newErrors.age = "Age must be a number and at least 18";
    }

    if (!validateSriLankanNIC(editedUser.id)) {
      newErrors.id = "Invalid Sri Lankan NIC format";
    }

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, you can proceed with submitting the data
      // Add your submission logic here
      console.log("Form is valid:", editedUser);
    } else {
      // Form is not valid, update the errors state
      setErrors(newErrors);
    }
  };

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
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <label>Firstname:</label>
                  <input
                    type="text"
                    name="firstname"
                    value={editedUser.firstname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Lastname:</label>
                  <input
                    type="text"
                    name="lastname"
                    value={editedUser.lastname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Age:</label>
                  <input
                    type="text"
                    name="age"
                    value={editedUser.age}
                    onChange={handleInputChange}
                  />
                  {errors.age && <div className="error">{errors.age}</div>}
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={editedUser.address}
                    onChange={handleInputChange}
                  />
                </div>{" "}
                <div className="form-group">
                  <label>Nic No:</label>
                  <input
                    type="text"
                    name="id"
                    value={editedUser.id}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
              {/* <div className="form-group">
                <label>Current Password:</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                />
              </div>
              <div className="form-group">
                <label>New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </div>
              <button
                className="btn btn-success"
                onClick={handleChangePassword}
              >
                Change Password
              </button> */}

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
                <strong>Nic No:</strong> {users.id}
              </p>
              <p>
                <strong>Address:</strong> {users.address}
              </p>

              {/* Display other user details here */}
            </div>
          )}

          {!isEditing && !imgUP && (
            <div className="button-containerr">
              <button
                className="btn btn-primary btn-editA"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
              <button
                className="btn btn-danger btn-deleteA"
                onClick={handleDeleteClick}
              >
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
