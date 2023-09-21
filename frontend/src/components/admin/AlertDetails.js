import React, { useState,useEffect } from 'react'
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
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import Swal from "sweetalert2";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import { styled } from '@mui/material/styles';

function AlertDetails() {

  const fileInput = React.useRef();
  
  const[notifications,setNotification]  = useState([])
  const[description,setDescription]  = useState()
  const[image,setImage]  = useState()
  const[search,setSearch] = React.useState()
  const[searchResult, setSearchResult] = React.useState([]);
  const[selectedUser,setSelectedUser] = React.useState()
  const[selectedUserName,setSelectedUserName] = React.useState()
  const[selectedUserVisibility,setSelectedUserVisibility] = React.useState(false)
  const[searchText,setSearchText]=React.useState("Loading...")
  const[openNotification,setOpenNotification]  = useState()
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
       "http://localhost:4041/admin/get-all-notifications",
        {},
        config
      );

      setNotification(data.notification);
      console.log(data.notification);
    } catch (error) {
      console.log(error);
    }
  };

  const editNotification=(notification)=>{
    setOpenNotification(notification)
    setSelectedUserVisibility(true)
    handleOpen()
  }

  const setUser=(user)=>{
    setSelectedUser(user._id)
    setSelectedUserName(user.username)
    setSelectedUserVisibility(true)
    setSearch("")
    setSearchResult(null)
  }
  const handleDelete = () => {
    setSelectedUserVisibility(false)
    setSelectedUser(null)
    setSelectedUserName(null)
  };

  const handleUpdate=async()=>{
    console.log(openNotification);
  }

  const handleSearch = async (event) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        `http://localhost:4041/admin/search?search=${search}`,
        config
      );
      if(data){
        setSearchResult(data);
      }
      else{
        setSearchResult(null);
      }
      
    } catch (error) {
        if(!error.response.data.status){
            setSearchResult(null);
            setSearchText(error.response.data.message)
        }
      console.log(error.response);
    }
  };

const postDetails = (pic) => {

    if (pic === undefined) {
      console.log("Plese upload an image!!!");
    }
    if (pic.type === "image/jpeg" || "image.png") {
      const data = new FormData();

      data.append("file", pic);

      data.append("upload_preset", "userImages");

      data.append("cloud_name", "cake-lounge");

      fetch("https://api.cloudinary.com/v1_1/cake-lounge/image/upload", {
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
    getAllNotifications()
  }, [notifications])

  useEffect(() => {
    handleSearch()
  }, [notifications])
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Grid container spacing={3}>
              
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>

              <React.Fragment>

                <Grid container spacing={4} sx={{ marginTop: "10px" }}>
                  {notifications?(
                    notifications.map((notification) => (
                    <Grid item xs={12} md={4}>
                      <Card sx={{ maxWidth: 345, minHeight: 350,maxHeight:450 }}>
                        <CardMedia
                          component="img"
                          style={{borderRadius:"0%" }}
                          image={notification.image}
                          alt="Paella dish"
                        />
                        <CardContent>
                          <Typography
                            variant="p"
                            color="text.primary"
                            sx={{ textAlign: "left", display: "flex" }}
                          >
                            {notification.description.length <= 35
                              ? notification.description
                              : notification.description.substr(0, 35) + "..."}
                          </Typography>
                          <br></br>
                          <Typography
                            variant="p"
                            color="text.secondary"
                            sx={{ display: "flex" }}
                          >
                          
                          {notification.description.length <= 95
                              ? notification.description
                              : notification.description.substr(0, 95) + "..."}
                          </Typography>

                        
                        </CardContent>

                        <CardActions disableSpacing>
                            <Button
                              variant="outlined"
                              startIcon={<EditIcon />}
                              sx={{
                                width: "100%",
                                bottom: 0,
                              }}
                              onClick={() => editNotification(notification)}
                            >
                              Update
                            </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))):(
                    <div>Loading...</div>
                  )
                  }
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
          <Grid container spacing={2}>
            <Grid item xs={8}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

          <input
            ref={fileInput}
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
          <img
              src={image?image:openNotification?.image}
              alt={image?image:openNotification?.image.charAt(0).toUpperCase()}
              loading="lazy"
              style={{borderRadius:"0%",width:"200px",height:"200px"}}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
              value={description?description:openNotification?.description}
              onChange={(e)=>setDescription(e.target.value)}
              />

              <Stack direction="row" spacing={1} sx={{mb:"10px",display: selectedUserVisibility ? 'block' : 'none',}} >
                  <Chip label={selectedUserName?selectedUserName:openNotification?.selectedUser} variant="outlined" onDelete={handleDelete} />
              </Stack>
              <InputBase
                  sx={{ 
                      ml: 1, 
                      flex: 1,
                      width:"15vw",
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '8px', }}
                      placeholder="Search user"
                      inputProps={{ "aria-label": "search users" }}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                  />
              <IconButton type="button" sx={{ p: "10px",border: '1px solid #ccc',borderRadius: '4px', }} aria-label="search">
                  <SearchIcon />
              </IconButton>

              <Divider sx={{ height: 28, m: 0.5 }} orientation="horizontal" />
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleUpdate} >Update</Button>
            </Grid>
            <Grid item xs={4}>
              <Item>
                {search ? (
                    <div>
                    <Box
                        sx={{
                        width: "100%",
                        maxHeight: 600,
                        maxWidth: 500,
                        bgcolor: "background.paper",
                        marginTop: "4px",
                        }}
                    >
                        {searchResult? (
                        <div>
                            {searchResult.map((user) => (
                            <ListItemButton>
                                <List
                                sx={{
                                    maxWidth: 500,
                                    bgcolor: "background.paper",
                                }}
                                >
                                <ListItem
                                    alignItems="flex-start"
                                    onClick={(e) => setUser(user)}
                                    key={user._id}
                                >
                                    <ListItemAvatar>
                                    <Avatar alt={user.username.charAt(0).toUpperCase()} src={user.userImage} />
                                    </ListItemAvatar>
                                    <ListItemText
                                    primary={user.username}
                                    secondary={user.email}
                                    sx={{ marginTop: "5px" }}
                                    />
                                </ListItem>

                                <Divider variant="middle" sx={{ width: "100%" }} />
                                </List>
                            </ListItemButton>
                            ))}
                        </div>
                        ) : (
                        <div>{searchText}</div>
                        )}
                    </Box>
                    </div>
                ) : (
                    <div></div>
                )}
              </Item>
            </Grid>
            </Grid>
          </Box>
      </Modal>

    </div>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default AlertDetails