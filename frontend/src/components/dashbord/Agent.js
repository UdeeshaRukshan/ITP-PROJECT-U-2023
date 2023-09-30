import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Agent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QRCode from "qrcode.react";

const Agent = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [updateAgentId, setUpdateAgentId] = useState(null);
  const [qrCodeData, setQRCodeData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedItemAddress, setSelectedItemAddress] = useState("");

  const [isQRCodeVisible, setIsQRCodeVisible] = useState(false);
  const [isAddAgentFormVisible, setIsAddAgentFormVisible] = useState(false);
  const [isAssignFormVisible, setIsAssignFormVisible] = useState(false);

  const [items, setItems] = useState([]);
  const [isUpdateAgentFormVisible, setIsUpdateAgentFormVisible] =
    useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    age: "",
    jobtype: "",
    assign: "",
  });

  const handleDelete = (agentId) => {
    // Show a confirmation dialog before deleting the agent
    if (window.confirm("Are you sure you want to delete this agent?")) {
      axios
        .delete(`http://localhost:4042/agent/delete/${agentId}`)
        .then((response) => {
          console.log("Agent deleted successfully");
          // Optionally, refresh the agent list or remove the deleted agent from the state
          // Example:
          setAgents(agents.filter((agent) => agent._id !== agentId));
        })
        .catch((error) => {
          console.error("Error deleting agent:", error);
        });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "item") {
      // Update formData.assign with the selected item's ID
      setFormData({ ...formData, assign: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  useEffect(() => {
    // Fetch items from your server
    axios
      .get("http://localhost:4042/property/getproperties")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);
  //handle submit button
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
          assign: "",
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
  //update form
  const handleUpdate = (e) => {
    e.preventDefault();

    // Send updated formData to your server using Axios or fetch
    axios
      .put(`http://localhost:4042/agent/update/${updateAgentId}`, formData)
      .then((response) => {
        console.log("Agent updated successfully");
        // Optionally, you can reset the form fields
        setFormData({
          name: "",
          address: "",
          age: "",
          jobtype: "",
          assign: "",
        });
        // Optionally, you can hide the update form
        toggleUpdateAgentForm();
        // Refresh the agents list or update the specific agent in the list
      })
      .catch((error) => {
        console.error("Error updating agent:", error);
      });
  };
  //toggle buttton
  const toggleAddAgentForm = (agentId) => {
    setIsAddAgentFormVisible(!isAddAgentFormVisible);
  };
  const toggleUpdateAgentForm = (agentId) => {
    setIsUpdateAgentFormVisible(!isUpdateAgentFormVisible);
    setUpdateAgentId(agentId); // Set the agent ID to update
  };

  //generate download report
  const handleGenerateReport = () => {
    // Send a GET request to the server to generate and download the report
    axios
      .get("http://localhost:4042/agent/generate-report", {
        responseType: "blob", // Set the response type to blob for binary data
      })
      .then((response) => {
        // Create a URL for the blob data and trigger a download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "agent_report.xlsx"); // Set the desired file name
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        // Generate QR code for the report's URL
        generateQRCodeForReport(url);
      })
      .catch((error) => {
        console.error("Error generating report:", error);
      });
  };

  //update form
  useEffect(() => {
    // Fetch agents from your server
    axios
      .get("http://localhost:4042/agent/agents")
      .then((response) => {
        setAgents(response.data);

        // If updateAgentId is set, find the matching agent and populate the form
        if (updateAgentId) {
          const agentToUpdate = response.data.find(
            (agent) => agent._id === updateAgentId
          );
          if (agentToUpdate) {
            setFormData({
              name: agentToUpdate.name,
              age: agentToUpdate.age,
              address: agentToUpdate.address,
              jobtype: agentToUpdate.jobtype,
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching agents:", error);
      });
  }, [updateAgentId]);

  //view qr code function
  const generateQRCodeForReport = (reportUrl) => {
    setQRCodeData(reportUrl);
    setIsQRCodeVisible(true);
  };
  //pdf download

  const downloadPdf = () => {
    axios
      .get("http://localhost:4042/generate-pdf", {
        responseType: "blob", // Set the response type to blob for binary data
      })
      .then((response) => {
        // Create a URL for the blob data and trigger a download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "agent_report.pdf"); // Set the desired file name
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };
  const toggleAssignForm = (agentId, itemAddress) => {
    setIsAssignFormVisible(!isAssignFormVisible);
    setSelectedItemId(agentId);
    setSelectedItemAddress(itemAddress);
  };
  const handleAssignItem = (agentId) => {
    if (agentId && selectedItemAddress) {
      // Find the selected agent by ID
      const updatedAgent = agents.find((agent) => agent._id === agentId);

      if (updatedAgent) {
        // Update the "assign" column of the selected agent with the item's address
        updatedAgent.assign = selectedItemAddress;

        // Create a new array of agents with the updated agent
        const updatedAgentsArray = agents.map((agent) =>
          agent._id === agentId ? updatedAgent : agent
        );

        // Update the state variable with the updated agent data
        setAgents(updatedAgentsArray);

        // Close the assignment form
        toggleAssignForm(null, "");
      }
    }
  };

  //Search function

  const handleSearch = () => {
    // Filter the agents based on the search input
    const filtered = agents.filter((agent) =>
      agent.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Update the filteredAgents state with the filtered results
    setFilteredAgents(filtered);
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
              className="image-agent"
              style={{ width: "20vh", height: "20vh" }}
              src={imageUrls[0].url} // Display the first image from the array
              alt={`Image 0`}
            />
          )}
        </a>
        <p className="user-name"> {users.username}</p>

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

      <div className="col-div-8 displayA" id="displayArea">
        <div className="search-bar">
          <input
            className="search-area"
            type="text"
            placeholder="Enter Agent Name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
          <button className="add-agent" onClick={toggleAddAgentForm}>
            Add Agent
          </button>
        </div>

        <div className="user-profilee">
          {isAssignFormVisible && (
            <div className="popup-form">
              <h3>Assign Item</h3>
              <div className="form-group">
                <label htmlFor="item">Select Item:</label>
                <select
                  id="item"
                  name="item"
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  value={selectedItemId}
                >
                  <option value="">Select an item</option>
                  {/* Map through your available items and display them as options */}
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.address}
                    </option>
                  ))}
                </select>
              </div>
              <button type="button" onClick={handleAssignItem}>
                Add
              </button>
              <button type="button" onClick={() => toggleAssignForm(null, "")}>
                Cancel
              </button>
            </div>
          )}
          {isUpdateAgentFormVisible && (
            <div className="popup-form">
              <h3>Update Agent</h3>
              <form onSubmit={handleUpdate}>
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

                <div className="button-container">
                  <button type="submit">Update Agent</button>
                  <div className="spacer"></div>
                  <button
                    className="btnn-cancel"
                    onClick={toggleUpdateAgentForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          {isAddAgentFormVisible ? (
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
                <div className="form-group">
                  <label htmlFor="item">Select Item:</label>
                  <select
                    id="item"
                    name="item"
                    onChange={handleInputChange}
                    value={formData.assign}
                  >
                    <option value="">Select an item</option>
                    {/* Map through your available items and display them as options */}
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.address}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="button-container">
                  <button type="submit">Add Agent</button>
                  <button onClick={toggleAddAgentForm}>Cancel</button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h2>Agents</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Job Type</th>
                    <th>Assign to</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tbody>
                    {filteredAgents.map((agent) => (
                      <tr key={agent._id}>
                        {/* Agent details rendering code */}
                      </tr>
                    ))}
                  </tbody>

                  {searchInput === ""
                    ? agents.map((agent) => (
                        <tr key={agent._id}>
                          <td>{agent.name}</td>
                          <td>{agent.age}</td>
                          <td>{agent.address}</td>
                          <td>{agent.jobtype}</td>
                          <td>{agent.assign}</td>
                          <td>
                            <button
                              className="btn btnAssign"
                              style={{
                                backgroundColor: "blue",
                                color: "white",
                              }}
                              onClick={() =>
                                toggleAssignForm(
                                  agent._id,
                                  agent.address,
                                  items.address
                                )
                              }

                              // onClick={() => handleAssign(agent._id)}
                            >
                              Assign
                            </button>
                            <button
                              className="btn btnUpdate"
                              style={{
                                backgroundColor: "green",
                                color: "white",
                              }}
                              onClick={() => toggleUpdateAgentForm(agent._id)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btnDelete"
                              style={{ backgroundColor: "red", color: "white" }}
                              onClick={() => handleDelete(agent._id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    : filteredAgents.map((agent) => (
                        <tr key={agent._id}>
                          <td>{agent.name}</td>
                          <td>{agent.age}</td>
                          <td>{agent.address}</td>
                          <td>{agent.jobtype}</td>
                          <td>
                            <button
                              className="btn btnAssign"
                              style={{
                                backgroundColor: "blue",
                                color: "white",
                              }}
                              onClick={() => toggleAssignForm(agent._id)}

                              // onClick={() => handleAssign(agent._id)}
                            >
                              Assign
                            </button>
                            <button
                              className="btn btnUpdate"
                              style={{
                                backgroundColor: "green",
                                color: "white",
                              }}
                              onClick={() => toggleUpdateAgentForm(agent._id)}
                            ></button>
                            <button
                              className="btn btnDelete"
                              style={{ backgroundColor: "red", color: "white" }}
                              onClick={() => handleDelete(agent._id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              {isQRCodeVisible && qrCodeData && <QRCode value={qrCodeData} />}
            </div>
          )}
          <div className="btn-compartment">
            <button
              className="btn btn-success btn-report
              "
              onClick={handleGenerateReport}
            >
              Download Excel Sheet
            </button>
            <button className="view-qr" onClick={generateQRCodeForReport}>
              View QR Code
            </button>
            <button className="down-qr" onClick={downloadPdf}>
              Download Pdf
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent;
