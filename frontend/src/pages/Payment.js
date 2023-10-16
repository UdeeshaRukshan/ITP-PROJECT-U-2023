import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

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
import "../pages/Payment.css";

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
                <div className="main-div">
                  <div className="col-div-8 displayA" id="displayArea">
                    <div className="search-bar">
                        HI This is payment gateway
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

export default function Payment() {
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
