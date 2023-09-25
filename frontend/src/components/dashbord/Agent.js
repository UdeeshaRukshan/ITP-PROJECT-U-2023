import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Agent.css";
import "bootstrap/dist/css/bootstrap.min.css";
const Agent = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [isAddAgentFormVisible, setIsAddAgentFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    age: "",
    jobtype: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send formData to your server using Axios or fetch
    axios
      .post("http://localhost:4042/agent/add", formData)
      .then((response) => {
        console.log("Agent added successfully");
        // Optionally, you can reset the form fields
        setFormData({
          name: "",
          address: "",
          age: "",
          jobtype: "",
        });
      })
      .catch((error) => {
        console.error("Error adding agent:", error);
      });
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
  useEffect(() => {
    // Fetch agents from your server
    axios
      .get("http://localhost:4042/agent/agents")
      .then((response) => {
        setAgents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching agents:", error);
      });
  }, []);

  const toggleAddAgentForm = () => {
    setIsAddAgentFormVisible(!isAddAgentFormVisible);
  };
  return (
    <div>
      <div id="mySidenav" class="sidenav">
        <p class="logo">
          <span>User</span> Profile
        </p>
        <a>
          {imageUrls.length > 0 && (
            <img
              style={{ width: "20vh", height: "20vh" }}
              src={imageUrls[0].url} // Display the first image from the array
              alt={`Image 0`}
            />
          )}
        </a>
        <p class="user-name"> {users.username}</p>

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
          <button onClick={toggleAddAgentForm}>Add Agent</button>

          {isAddAgentFormVisible && (
            <div className="popup-form">
              <h3>Add New Agent</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="jobtype">Job Type</label>
                  <input
                    type="text"
                    id="jobtype"
                    name="jobtype"
                    value={formData.jobtype}
                    onChange={handleInputChange}
                  />
                </div>

                <button type="submit">Add Agent</button>
              </form>

              {/* Add a "Cancel" button or close icon */}
              <button onClick={toggleAddAgentForm}>Cancel</button>
            </div>
          )}

          <h2>Agents</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Job Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent._id}>
                  <td>{agent.name}</td>
                  <td>{agent.age}</td>
                  <td>{agent.address}</td>
                  <td>{agent.jobtype}</td>
                  <td>
                    <button
                      style={{ backgroundColor: "blue", color: "white" }}
                      onClick={() => handleAssign(agent._id)}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Agent;
