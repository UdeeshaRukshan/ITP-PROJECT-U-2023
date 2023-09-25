import React from 'react'
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function SendNewAlerts() {

    const fileInput = React.useRef();

    const[image,setImage] = React.useState()
    const[imageName,setImageName] = React.useState()
    const[description,setDescription] = React.useState()
    const[search,setSearch] = React.useState()
    const[searchResult, setSearchResult] = React.useState([]);
    const[selectedUser,setSelectedUser] = React.useState()
    const[selectedUserName,setSelectedUserName] = React.useState()
    const[selectedUserVisibility,setSelectedUserVisibility] = React.useState(false)
    const[searchText,setSearchText]=React.useState("Loading...")

    const handleSubmit=(e)=>{

        e.preventDefault()

        if(!image || !description || !selectedUser ||!selectedUserName){
            Swal.fire({
              icon: "error",
              title: "Please enter all fields",
              text: "error while publishing artical",
            });
          }
          else{
            try {
              const config = {
                headers: {
                  "Content-type": "application/json",
                },
              };
              const { data } = axios.post(
                "http://localhost:4041/admin/send-notification",
                { 
                  image,
                  description,
                  selectedUser,
                  selectedUserName
                 },
                config
              );
      
              console.log(data);
              Swal.fire({
                icon: "success",
                title: "Published",
                text: "Artical has been published",
              });
              setImage(null)
              setDescription("")
              setSelectedUser(null)
              setSearchText(null)
              setSelectedUserVisibility(false)
              setSelectedUserName(null)
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error while sending notification",
                  });
            }
          }
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
          setImageName(pic)
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

    React.useEffect(() => {
        handleSearch();
    }, [search]);

  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box component="form" onSubmit={handleSubmit} noValidate 
        sx={{ 
            mt: 1,
            border: '1px solid #ccc',
            padding: '16px', 
            borderRadius: '4px',
            width:"75%",
            position: "relative"
            }} >

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
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
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            />
            <Stack direction="row" spacing={1} sx={{mb:"10px",display: selectedUserVisibility ? 'block' : 'none',}} >
                <Chip label={selectedUserName} variant="outlined" onDelete={handleDelete} />
            </Stack>
            <InputBase
                sx={{ 
                    ml: 1, 
                    flex: 1,
                    width:"50vw",
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

            <Box
              sx={{
                position: "absolute",
                width: "70%",
                maxHeight: 200,
                overflowY: "auto", 
                bgcolor: "background.paper",
                ml:"50px",
                marginTop: "4px",
                zIndex: 2,
              }}
            >
            {search ? (
                <div>
                <Box
                    sx={{
                    width: "100%",
                    maxHeight: 400,
                    maxWidth: 560,
                    bgcolor: "background.paper",
                    marginLeft: "80px",
                    marginTop: "4px",
                    }}
                >
                    {searchResult? (
                    <div>
                        {searchResult.map((user) => (
                        <ListItemButton>
                            <List
                            sx={{
                                width: "100%",
                                maxWidth: 400,
                                bgcolor: "background.paper",
                            }}
                            >
                            <ListItem
                                alignItems="flex-start"
                                sx={{ marginLeft: "20px" }}
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
            </Box>

            <Divider sx={{ height: 28, m: 0.5 }} orientation="horizontal" />

            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2,width:"20%",zIndex: 1,backgroundColor:"green",borderRadius:"10px" }}
              >
                Send
              </Button>
              </div>
        </Box>
    </div>
  )
}

export default SendNewAlerts