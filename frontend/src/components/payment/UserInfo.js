import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const phonePattern = /^[0-9]{10}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

const isPhoneNumberValid = (phoneNumber) => {
  return phonePattern.test(phoneNumber);
};

const isEmailValid = (email) => {
  return emailPattern.test(email);
};

export default function UserInfo({ onUserInfoSubmit }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting via HTTP request

    // Create an object to hold the user information
    const userInfo = {
      firstName,
      lastName,
      address,
      email,
      phone,
    };

    // Call the callback function to submit the user information
    onUserInfoSubmit(userInfo);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              fullWidth
              autoComplete="address"
              variant="outlined"
              multiline // This enables multiline input
              rows={4} // Set the number of visible rows
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="outlined"
              error={!isEmailValid(email)}
              helperText={
                !isEmailValid(email)
                  ? "Please enter a valid Gmail address (e.g., yourname@gmail.com)"
                  : ""
              }
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone Number"
              fullWidth
              autoComplete="tel"
              variant="outlined"
              error={!isPhoneNumberValid(phone)}
              helperText={
                !isPhoneNumberValid(phone)
                  ? "Please enter a valid 10-digit phone number"
                  : ""
              }
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  name="sendAuctionUpdates"
                  value="yes"
                />
              }
              label="Send me auction updates"
            />
          </Grid>
        </Grid>
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
}
