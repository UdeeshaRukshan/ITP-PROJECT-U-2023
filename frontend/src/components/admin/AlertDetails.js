import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import Swal from "sweetalert2";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

function AlertDetails() {
  const fileInput = React.useRef();

  const [notifications, setNotification] = useState([]);
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [search, setSearch] = React.useState();
  const [searchResult, setSearchResult] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState();
  const [selectedUserName, setSelectedUserName] = React.useState();
  const [userInfo, setUserInfo] = useState();
  const [id, setId] = useState();
  const [selectedUserVisibility, setSelectedUserVisibility] =
    React.useState(false);
  const [searchText, setSearchText] = React.useState("Loading...");
  const [openNotification, setOpenNotification] = useState();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAllNotifications = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        "http://localhost:4042/admin/get-all-notifications",
        {},
        config
      );
      setNotification(data.notification);
    } catch (error) {
      console.log(error);
    }
  };

  const editNotification = (notification) => {
    setOpenNotification(notification);
    setImage(notification.image);
    setDescription(notification.description);
    setSelectedUser(notification.selectedUser);
    setSelectedUserName(notification.selectedUserName);
    setId(notification._id);
    setSelectedUserVisibility(true);
    handleOpen();
  };

  const handleUpdate = async () => {
    if (!image || !description || !id) {
      Swal.fire({
        icon: "error",
        title: "Please enter all fields",
        text: "error while publishing artical",
      });
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:4042/admin/update-notification",
          {
            image,
            description,
            id,
          },
          config
        );
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Notification has been updated",
        });
        setOpen(false);
        setImage(null);
        setDescription("");
        setSelectedUser(null);
        setSearchText(null);
        setSelectedUserVisibility(false);
        getAllNotifications();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error while updating notification",
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:4042/admin/delete-notification",
        {
          id,
        },
        config
      );
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Notification has been deleted",
      });
      setOpen(false);
      setImage(null);
      setDescription("");
      setSelectedUser(null);
      setSearchText(null);
      setSelectedUserVisibility(false);
      getAllNotifications();
    } catch (error) {
      setOpen(false);
      setImage(null);
      setDescription("");
      setSelectedUser(null);
      setSearchText(null);
      setSelectedUserVisibility(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error while deleting notification",
      });
    }
  };

  const handleSearch = async (event) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        `http://localhost:4042/admin/search?search=${search}`,
        config
      );
      if (data) {
        setSearchResult(data);
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      if (!error.response.data.status) {
        setSearchResult(null);
        setSearchText(error.response.data.message);
      }
    }
  };

  const postDetails = (pic) => {
    if (pic === undefined) {
      console.log("Plese upload an image!!!");
    }
    if (pic.type === "image/jpeg" || "image.png") {
      const data = new FormData();

      data.append("file", pic);

      // Setup your cloudinary detailsn here
      data.append("upload_preset", "yourfile name");

      data.append("cloud_name", "your cloud name");

      fetch("your cloudinary upload link here", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())

        .then((data) => {
          //const imageUrl = data.url.toString();
          setImage(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Plese upload an image!!!");
    }
  };

  useEffect(() => {
    getAllNotifications();
  }, []);

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              border: "2px solid",
              width: "60%",
            }}
          >
            <React.Fragment>
              <Grid container spacing={4}>
                {notifications ? (
                  notifications.map((notification) => (
                    <Grid item xs={12} key={notification._id}>
                      <Card
                        sx={{ maxWidth: "100%", minHeight: 40, maxHeight: 200 }}
                      >
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid Grid item xs={8}>
                              <Typography
                                variant="p"
                                color="text.primary"
                                sx={{ textAlign: "left", display: "flex" }}
                              >
                                {notification.selectedUserName}
                              </Typography>
                            </Grid>
                            <Grid
                              Grid
                              item
                              xs={4}
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Button
                                variant="contained"
                                onClick={() => editNotification(notification)}
                                sx={{ backgroundColor: "green" }}
                              >
                                View
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <div>Loading...</div>
                )}
              </Grid>
            </React.Fragment>
          </Paper>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              ref={fileInput}
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
            <img
              src={image ? image : null}
              alt={image?.charAt(0).toUpperCase()}
              loading="lazy"
              style={{ borderRadius: "0%", width: "200px", height: "200px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button color="success" onClick={() => fileInput.current.click()}>
              Change Image
            </Button>
          </div>
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
            autoFocus
            value={description ? description : "no description"}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Stack
            direction="row"
            spacing={1}
            sx={{
              mb: "10px",
              display: selectedUserVisibility ? "block" : "none",
            }}
          >
            <Chip
              label={selectedUserName ? selectedUserName : "no user"}
              variant="contained"
            />
          </Stack>

          <Button style={{ marginRight: "150px" }} onClick={handleClose}>
            Close
          </Button>
          <Button
            style={{ marginRight: "20px" }}
            variant="contained"
            color="success"
            onClick={handleUpdate}
          >
            Save
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default AlertDetails;
