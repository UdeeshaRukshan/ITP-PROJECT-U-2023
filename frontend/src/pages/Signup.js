import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { InputLabel } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./SignUp.css";

function isValidEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return password.length >= 8 && password.includes("@");
}

function isValidAge(age) {
  age = age.replace(/[^0-9]/g, "");
  return age >= 18 && age <= 85;
}

function containsNumber(inputString) {
  return /\d/.test(inputString);
}

function isValidSriLankanNIC(nic) {
  if (nic.length !== 12) {
    return false;
  }

  const birthdatePart = nic.substring(0, 9);
  const genderPart = nic.charAt(9);
  const otherPart = nic.substring(10);

  if (!/^\d{2}$/.test(otherPart)) {
    return false;
  }

  return true;
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

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
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
    if (name === "firstname" && containsNumber(value)) {
      setErrors({
        ...errors,
        firstname: "First name should not contain numbers.",
      });
      return;
    }

    if (name === "lastname" && containsNumber(value)) {
      setErrors({
        ...errors,
        lastname: "Last name should not contain numbers.",
      });
      return;
    }

    // Clear errors if the input is valid
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrors({
        ...errors,
        email: "Invalid email address. Please enter a valid email.",
      });
      return;
    }

    if (!isValidPassword(password)) {
      setErrors({
        ...errors,
        password:
          "Password must be at least 8 characters long and contain '@'.",
      });
      return;
    }

    if (!isValidAge(age)) {
      setErrors({ ...errors, age: "You must be between 18 and 85 years old." });
      return;
    }

    if (containsNumber(firstname)) {
      setErrors({
        ...errors,
        firstname: "First name should not contain numbers.",
      });
      return;
    }

    if (containsNumber(lastname)) {
      setErrors({
        ...errors,
        lastname: "Last name should not contain numbers.",
      });
      return;
    }

    const isValidNIC = isValidSriLankanNIC(id);
    if (!isValidNIC) {
      setErrors({ ...errors, id: "Invalid Sri Lankan NIC number." });
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
      <Container
        component="main"
        style={{ maxWidth: "600px" }}
        className="small-container"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "15vh",
          }}
        >
          <img
            className="login-img"
            src="https://res.cloudinary.com/dkflvz7re/image/upload/v1695736356/ibrezjjiztmfuqduuwox.png"
            alt="Logo"
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
                  error={!!errors.firstname}
                  helperText={errors.firstname}
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
                  error={!!errors.lastname}
                  helperText={errors.lastname}
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
                  error={!!errors.email}
                  helperText={errors.email}
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
                  error={!!errors.password}
                  helperText={errors.password}
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
                  error={!!errors.id}
                  helperText={errors.id}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <TextField
                  required
                  id="outlined-number"
                  fullWidth
                  label="Age"
                  type="number"
                  name="age"
                  value={age}
                  placeholder="Age"
                  onChange={handleOnChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.age}
                  helperText={errors.age}
                />
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
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
