import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Swal from "sweetalert2";
import axios from "axios";
import PropTypes from "prop-types";
import LogoutIcon from "@mui/icons-material/Logout";
import { mainListItems } from "../../components/admin/listItems";
import {Text,Badge,Button,Paper, Title,Container,Table, Group} from '@mantine/core';
import { useQuery } from "react-query";
import Chip from '@mui/material/Chip';
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

 
function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const [rowData, setRowData] = useState({
    RefID: "",
    subject: "",
    Category: "",
    Message: "",
    Email: "",
    isSolved : false,
  });
  const [opened, setOpened] = useState(false);
  const { error, isLoading, data, refetch } = useQuery({

    queryKey: ["raisedTickets"],
    queryFn: () =>
      axios
        .get("http://localhost:4042/ticket/getall", { withCredentials: true })
        .then((res) => res.data),
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const changeTicketStatus = (ticketId) =>{
    axios.put(`http://localhost:4042/ticket/update/${ticketId}`,{withCredentials : true}).then((res) =>{
      refetch();
    })
  }
  
  //generate table rows
  const rows = data
    ? data.map((ticket, index) => (
        <tr key={ticket._id}>
          <td>{<Text color="dark">{`#REF${ticket._id.slice(1, 6)}`}</Text>}</td>
          <td>{<Text color="dark">{ticket.subject}</Text>}</td>
          <td>
            {
              <Chip
                color={ticket.ticketSolved === true ? "success" : "warning"}
                variant="soft"
                label={ticket.ticketSolved === true ? "SOLVED" : "PENDING"}
              />
            }
          </td>
          <td>
            {
              <Text color="dark">
                {
                  new Date(ticket.createdAt)
                    .toLocaleDateString("en-GB")
                    .split("T")[0]
                }
              </Text>
            }
          </td>
          <td>{<Text color="dark">last Action</Text>}</td>
          <td>
            {
              <>
                <Button
                  onClick={() => {
                    setRowData({
                      ...rowData,
                      RefID: `#REF${ticket._id.slice(1, 6)}`,
                      subject: ticket.subject,
                      Message: ticket.message,
                      Email: ticket.loggedUserEmail,
                      Category: ticket.category,
                      isSolved: ticket.ticketSolved,
                    });
                    setOpened(true);
                  }}
                  mr={5}
                >
                  View
                </Button>
                <Button onClick={()=>changeTicketStatus(ticket._id)} disabled={ticket.ticketSolved}>Mark As solved</Button>
              </>
            }
          </td>
        </tr>
      ))
    : null;
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
            // component="main"
            // // sx={{
            // //   backgroundColor: (theme) =>
            // //     theme.palette.mode === "light"
            // //       ? theme.palette.grey[100]
            // //       : theme.palette.grey[900],
            // //   flexGrow: 1,
            // //   height: "100vh",
            // //   overflow: "auto",
            // //   width: "100%",
            // // }}
          >
            <Box
              sx={{
                borderBottom: 1,
                // borderColor: "divider",
                width: "84vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px 20px",
              }}
            >
            <Paper shadow="md" radius={"md"} withBorder mt={20}>
            <Title order={1} align="center" mb={10}>
              Support Tickets
            </Title>
            <Divider />
            <Container>
              <Table highlightOnHover withBorder mt={10} mb={10}>
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Date Created</th>
                    <th>Last Action</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </Container>
          </Paper>
          </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )}
 

export default function Dashboard() {
  return <DashboardContent/>;
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
