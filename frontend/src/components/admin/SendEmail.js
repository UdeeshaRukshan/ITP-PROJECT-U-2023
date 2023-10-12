import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Swal from "sweetalert2";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

function SendEmail() {
  const [userEmail, setUserEmail] = React.useState();
  const [subject, setSubject] = React.useState();
  const [message, setMessgae] = React.useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userEmail || !subject || !message) {
      Swal.fire({
        icon: "error",
        title: "Please enter all fields",
        text: "error while sending email",
      });
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { info } = axios.post(
          "http://localhost:4042/admin/sendEmail",
          {
            userEmail,
            subject,
            message,
          },
          config
        );

        console.log(info);
        Swal.fire({
          icon: "success",
          title: "Email send",
          text: "Email has been send successfully to " + userEmail,
        });
        setUserEmail("");
        setSubject("");
        setMessgae("");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error while sending email",
        });
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          mt: 1,
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "4px",
          width: "75%",
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="To"
          name="email"
          autoComplete="email"
          autoFocus
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="subject"
          label="Subject"
          name="subject"
          autoComplete="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessgae(e.target.value)}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="horizontal" />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "50%", backgroundColor: "green" }}
          >
            Send
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default SendEmail;
