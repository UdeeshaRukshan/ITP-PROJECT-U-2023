import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashbord.css";
// import { useCookies } from "react-cookie"; // Import useCookies from react-cookie
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import axios from "axios"; // Import axios for making API requests
// import { toast } from "react-toastify"; // Import toast for notifications

const DDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from your server
    axios
      .get("http://localhost:4042/dashbord")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

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
        <a href="/dashbord" class="icon-a" id="btn2" onclick="changeContent()">
          <i class="fa fa-video-camera"></i> &nbsp;&nbsp;Order History
        </a>
        <a href="/dashbord/payment" class="icon-a" id="btn3">
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

      <div class="col-div-8" id="displayArea">
        <table className="styled-table">
          {" "}
          {/* Add a className for styling */}
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Age</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.age}</td>
                <td>{user.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div class="clearfix"></div>

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    </div>
  );
  // const navigate = useNavigate();
  // const [users, setUsers] = useState([]);
  // const [selectedUser, setSelectedUser] = useState(null);
  // const [username, setUsername] = useState("");

  // const [cookies, removeCookie] = useCookies(["token"]); // Initialize the 'token' cookie

  // useEffect(() => {
  //   const verifyCookie = async () => {
  //     if (!cookies.token) {
  //       navigate("/login");
  //     }
  //     const { data } = await axios.post(
  //       "http://localhost:4040",
  //       {},
  //       { withCredentials: true }
  //     );
  //     const { status, user } = data;
  //     setUsername(user);
  //     return status
  //       ? toast(`Hello ${user}`, {
  //           position: "top-right",
  //         })
  //       : (removeCookie("token"), navigate("/login"));
  //   };
  //   verifyCookie();
  // }, [cookies, navigate, removeCookie]);
  // const Logout = () => {
  //   removeCookie("token");
  //   navigate("/signup");
  // };
  // // Fetch the list of users from your server and update the 'users' state
  // // You can use the 'axios' library or 'fetch' API for making HTTP requests.
  // // For simplicity, let's assume 'users' is an array of user objects.
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("/api/users"); // Replace with your API endpoint
  //     const data = await response.json();
  //     setUsers(data);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []); // Fetch data when the component mounts

  // const handleRead = (user) => {
  //   // Display user details or perform read operation
  //   setSelectedUser(user);
  // };

  // const handleUpdate = (user) => {
  //   // Perform update operation or navigate to an update page
  //   // For demonstration purposes, let's navigate to an update page
  //   // Replace '/update-user' with the actual route for updating a user
  //   window.location.href = `/update-user/${user.id}`;
  // };

  // const handleDelete = async (user) => {
  //   // Perform delete operation
  //   try {
  //     // Send a DELETE request to your server to delete the user
  //     await fetch(`/api/users/${user.id}`, {
  //       method: "DELETE",
  //     });

  //     // Update the 'users' state to reflect the changes (remove the deleted user)
  //     setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));

  //     // Clear the selectedUser state
  //     setSelectedUser(null);
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };

  // return (
  //   <div>
  //     <h1>Welcome to the Dashboard</h1>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>User ID</th>
  //           <th>{username}</th>
  //           <th>Email</th>
  //           <th>Actions</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {users.map((user) => (
  //           <tr key={user.id}>
  //             <td>{user.id}</td>
  //             <td>{user.username}</td>
  //             <td>{user.email}</td>
  //             <td>
  //               <button onClick={() => handleRead(user)}>Read</button>
  //               <button onClick={() => handleUpdate(user)}>Update</button>
  //               <button onClick={() => handleDelete(user)}>Delete</button>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>

  //     {selectedUser && (
  //       <div>
  //         <h2>User Details</h2>
  //         <p>User ID: {selectedUser.id}</p>
  //         <p>Username: {selectedUser.username}</p>
  //         <p>Email: {selectedUser.email}</p>
  //         {/* Display other user details */}
  //       </div>
  //     )}
  //   </div>
  // );
};

export default DDashboard;
