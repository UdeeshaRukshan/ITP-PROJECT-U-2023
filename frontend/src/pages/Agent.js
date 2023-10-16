import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import jsPDF from "jspdf";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import "jspdf-autotable";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Link from "@mui/material/Link";

import { mainListItems } from "../components/admin/listItems";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Swal from "sweetalert2";
import axios from "axios";
import PropTypes from "prop-types";

import LogoutIcon from "@mui/icons-material/Logout";
import "bootstrap/dist/css/bootstrap.min.css";
import QRCode from "qrcode.react";
import "../pages/Agent.css";

const drawerWidth = 0;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     backgroundColor:"#232c61",
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: 260,
    height: "100vh",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [updateAgentId, setUpdateAgentId] = useState(null);
  const [qrCodeData, setQRCodeData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedItemAddress, setSelectedItemAddress] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
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
  const logout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Please save all changes before logout!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminInfo");
        localStorage.clear();
        window.location.reload();
      }
    });
  };

  const handleDelete = (agentId) => {
    // Show a confirmation dialog before deleting the agent
    if (window.confirm("Are you sure you want to delete this agent?")) {
      axios
        .delete(`http://localhost:4043/agent/delete/${agentId}`)
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
      .get("http://localhost:4043/property/getproperties")
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
      .post("http://localhost:4043/agent/add", formData)
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
      .get("http://localhost:4043/image") // Fix the URL, add "http://"
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
      .get("http://localhost:4043/dashbord", {
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
      .get("http://localhost:4043/agent/agents")
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
    const updatedData = {
      ...formData,
      assign: selectedItem,
    };
    // Send updated formData to your server using Axios or fetch
    axios
      .put(`http://localhost:4043/agent/update/${updateAgentId}`, formData)
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
        setSelectedItem("");
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
      .get("http://localhost:4043/agent/generate-report", {
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
      .get("http://localhost:4043/agent/agents")
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

  const generateAndDownloadPdf = (agents) => {
    const doc = new jsPDF();

    // Set the title of the PDF
    doc.text("Agent Report", 10, 10);

    // Create a table with column headers
    const headers = ["Name", "Age", "Address", "Job Type", "Assign To"];
    const data = agents.map((agent) => [
      agent.name,
      agent.age,
      agent.address,
      agent.jobtype,
      agent.assign,
    ]);

    // Use autoTable from the plugin
    doc.autoTable({
      startY: 20,
      head: [headers],
      body: data,
    });
    const totalAgentCount = agents.length;

    // Add the total agent count to the PDF
    doc.text(
      `Total Agent Count: ${totalAgentCount}`,
      10,
      doc.autoTable.previous.finalY + 10
    );
    // Save the PDF with a specific name
    doc.save("agent_report.pdf");
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
    <Box sx={{ flexGrow: 1, display: "block" }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Drawer variant="permanent" open={open}>
            <List component="nav">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ width: "100px", height: "100px" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Divider sx={{ width: "75%", mt: "10px" }} />
              </div>
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              <Button
                component="label"
                variant="contained"
                startIcon={<LogoutIcon />}
                onClick={logout}
              >
                LogOut
                <VisuallyHiddenInput type="file" />
              </Button>
            </List>
          </Drawer>
        </Grid>
        <Grid item xs={10}>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
              width: "100%",
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                width: "84vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px 20px",
              }}
            >
              <Box>
                {" "}
                <div className="main-div">
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
                      <button
                        className="add-agent"
                        onClick={toggleAddAgentForm}
                      >
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
                              onChange={(e) =>
                                setSelectedItemId(e.target.value)
                              }
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
                          <button
                            type="button"
                            onClick={() => toggleAssignForm(null, "")}
                          >
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

                            <div className="button-containerrr">
                              <button type="submit">Update Agent</button>
                              <div className="spacer"></div>
                              <button
                                className="btnn-cancel"
                                onClick={toggleUpdateAgentForm}
                                style={{ marginLeft: "2vh" }}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                      {isAddAgentFormVisible ? (
                        <div
                          className="popup-form"
                          style={{ marginLeft: "-7vh" }}
                        >
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
                              <button onClick={toggleAddAgentForm}>
                                Cancel
                              </button>
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
                                            marginTop: "3vh",
                                          }}
                                          onClick={() =>
                                            toggleUpdateAgentForm(agent._id)
                                          }
                                        >
                                          Update
                                        </button>
                                        <button
                                          className="btn btnDelete"
                                          style={{
                                            backgroundColor: "red",
                                            color: "white",
                                          }}
                                          onClick={() =>
                                            handleDelete(agent._id)
                                          }
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
                                      <td>{agent.assign}</td>
                                      <td>{agent.jobtype}</td>
                                      <td>
                                        <button
                                          className="btn btnAssign"
                                          style={{
                                            backgroundColor: "blue",
                                            color: "white",
                                          }}
                                          onClick={() =>
                                            toggleAssignForm(agent._id)
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
                                            marginTop: "3vh",
                                          }}
                                          onClick={() =>
                                            toggleUpdateAgentForm(agent._id)
                                          }
                                        >
                                          Update
                                        </button>
                                        <button
                                          className="btn btnDelete"
                                          style={{
                                            backgroundColor: "red",
                                            color: "white",
                                          }}
                                          onClick={() =>
                                            handleDelete(agent._id)
                                          }
                                        >
                                          Remove
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>
                          {isQRCodeVisible && qrCodeData && (
                            <QRCode value={qrCodeData} />
                          )}
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
                        <button
                          className="view-qr"
                          onClick={generateQRCodeForReport}
                          style={{ marginTop: "3vh" }}
                        >
                          View QR Code
                        </button>
                        <button
                          className="down-qr"
                          onClick={() => generateAndDownloadPdf(agents)}
                        >
                          Download Pdf
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>

    // <ThemeProvider theme={mdTheme}>
    //   <CssBaseline />
    //   {/* <AppBar position="absolute" open={open}>
    //       <Toolbar>
    //         <Typography
    //           component="h1"
    //           variant="h6"
    //           color="inherit"
    //           noWrap
    //           sx={{ flexGrow: 1 }}
    //         >
    //           AuctionPal
    //         </Typography>
    //         <IconButton color="inherit">
    //           <Badge badgeContent={4} color="secondary">
    //             <NotificationsIcon />
    //           </Badge>
    //         </IconButton>
    //       </Toolbar>
    //     </AppBar> */}

    //   <Box sx={{ display: "flex" }}>

    //   </Box>

    // </ThemeProvider>
  );
}

function LoginForm() {
  const [loginStatus, setLoginStatus] = React.useState(0);
  const [userName, setUserName] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setUserName(data.get("userName"));
    setPassword(data.get("password"));
    console.log({
      userName: data.get("userName"),
      password: data.get("password"),
    });

    var isSuccess = true;

    if (!data.get("userName")) {
      isSuccess = false;
      Swal.fire({
        title: "Error!",
        text: "Please enter user name !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
    }

    if (!data.get("password")) {
      isSuccess = false;
      Swal.fire({
        title: "Error!",
        text: "Please enter password !!!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
    }
    if (isSuccess) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:4043/admin/signin",
          {
            userName,
            password,
          },

          config
        );
        console.log(data);

        localStorage.setItem("adminInfo", JSON.stringify(data));
        console.log(data.token);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login success",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoginStatus(1);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.error,
          footer: '<a href="">Why do I have this issue?</a>',
        });

        console.log(`Error occured ${error.response.data.message}`);
        console.log(error.response);
      }
    }
  };

  useEffect(() => {
    const logInfo = localStorage.getItem("adminInfo");

    if (logInfo) {
      setLoginStatus(1);
    } else {
      setLoginStatus(2);
    }
  }, []);

  if (loginStatus === 0) {
    return <>Loading...</>;
  } else if (loginStatus === 1) {
    return <DashboardContent />;
  } else {
    return (
      <ThemeProvider theme={mdTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              data-testid="dashboard-login-heading"
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="userName"
                data-testid="admin-user-name"
                autoFocus
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                data-testid="admin-password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    data-testid="admin-login-frogot-password"
                  >
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default function Agent() {
  return <LoginForm />;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
