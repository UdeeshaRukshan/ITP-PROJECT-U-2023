import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { InputLabel } from "@mui/material";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import "./SignUp.css";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        AuctionPal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function isValidEmail(email) {
  // Simple email validation regex
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  // Password validation criteria (customize as needed)
  return password.length >= 8;
}

function isValidAge(age) {
  // Age validation criteria (customize as needed)
  return age >= 18;
}

const defaultTheme = createTheme();
const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    address: "",
    age: "",
    id: "",
  });
  const { email, password, firstname, lastname, address, age, id } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    if (!isValidEmail(email)) {
      handleError("Invalid email address");
      return;
    }

    if (!isValidPassword(password)) {
      handleError("Password must be at least 8 characters long");
      return;
    }

    if (!isValidAge(age)) {
      handleError("You must be at least 18 years old");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4042/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
      age: "",
      id: "",
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" style={{ maxWidth: "sm" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            class="login-img"
            src="https://res.cloudinary.com/dkflvz7re/image/upload/v1695736356/ibrezjjiztmfuqduuwox.png"
          />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  value={firstname}
                  autoFocus
                  placeholder="Enter your First name"
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  value={lastname}
                  autoComplete="family-name"
                  placeholder="Enter your Last name"
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="text"
                  id="address"
                  autoComplete="new-address"
                  value={address}
                  placeholder="Enter your Address"
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="id"
                  label="Nic No"
                  type="text"
                  id="Nic"
                  autoComplete="new-Nic"
                  value={id}
                  placeholder="Enter your Nic No"
                  onChange={handleOnChange}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  name="age"
                  onChange={handleOnChange}
                  style={{ width: "100%", height: "20px" }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
