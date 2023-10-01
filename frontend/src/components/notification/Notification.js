import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMessage } from "@fortawesome/free-solid-svg-icons";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme();


export default function Notification(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [userId, setUserId] = useState(props.userId)

    const getAllNotificationByUserId=async(userId)=>{
        try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data } = await axios.post(
              "http://localhost:4042/admin/getAllNotification-ByUserId",
              {
                userId
              },
    
              config
            );
            setNotifications(data)
          } catch (error) {
            setNotifications(null)
            console.log(error);
          }
    }

    const handleNotification=async()=>{
        setUserId(props.userId)
        getAllNotificationByUserId(userId)
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        getAllNotificationByUserId(userId)
    }, [])
    
        
  return (
    <ThemeProvider theme={theme}>
        <FontAwesomeIcon
              icon={faMessage}
              style={{ color: "#ffffff", width: "30px", height: "30px" }}
              onClick={() => handleNotification()}
            />

        {isOpen && (
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            position: 'absolute',
            mt:'200px',
            ml:'-350px'
          }}
        >
          {notifications.length>0? notifications.map((notification, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar src={notification.image}>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Admin"
                secondary={notification.description}
              />
            </ListItem>
          )):(
            <div>
                No Notifications Yet
            </div>
          )}
        </List>
      )}
    </ThemeProvider>
  )
}
