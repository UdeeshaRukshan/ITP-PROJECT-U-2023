import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./biddingHistory.css";
import AuctionHistory from "../../category/vehicles/BidHistory";

import "bootstrap/dist/css/bootstrap.min.css";

const BiddingHistory = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [users, setUsers] = useState([]);

  //validation

  useEffect(() => {
    axios
      .get("http://localhost:4042/image") // Fix the URL, add "http://"
      .then((response) => {
        const fetchedImageUrls = response.data;
        setImageUrls(fetchedImageUrls);
        // const filteredImages = imageUrls.filter(imageUrl => imageUrl.useremail === userEmail);
      })
      .catch((error) => {
        console.error(error);
        // Handle errors
      });
  }, []);

  useEffect(() => {
    // Fetch user data from your server
    axios
      .get("http://localhost:4042/dashbord", {
        withCredentials: true, //fix cookie problem
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="main-div">
      <div id="mySidenav" class="sidenav">
        <p class="logo">
          <span>User</span> Profile
        </p>
        <a>
          {imageUrls.length > 0 && (
            <img
              className="img-x"
              style={{ width: "20vh", height: "20vh" }}
              src={
                imageUrls.length > 0 ? imageUrls[imageUrls.length - 1].url : ""
              } // Display the first image from the array
              alt={`Image 0`}
            />
          )}
          <p class="user-name"> {users.firstname + " " + users.lastname}</p>
        </a>
        <p className="user-name"> {users.username}</p>

        <a href="/dashbord" class="icon-a" id="btn1">
          <i class="fa fa-users icons"></i> &nbsp;&nbsp;Profile Information
        </a>
        <a
          href="/dashbord/orderhistory"
          class="icon-a"
          id="btn2"
          onclick="changeContent()"
        >
          <i class="fa fa-video-camera"></i> &nbsp;&nbsp;Order History
        </a>
        <a href="/dashbord/payment" class="icon-a" id="btn3">
          <i class="fa fa-tv"></i> &nbsp;&nbsp;Payment History
        </a>
        <a href="/dashbord/feedback" class="icon-a" id="btn4">
          <i class="fa fa-tasks icons"></i> &nbsp;&nbsp;Feedbacks
        </a>
      </div>
      <div id="main">
        <div class="head">
          <div class="col-div-6"></div>

          <div class="col-div-6">
            <div class="profile"></div>
          </div>
          <div class="clearfix"></div>
        </div>

        <div class="clearfix"></div>
        <br />
      </div>
      <div class="clearfix"></div>
      <br />
      <br />

      <div
        className="col-div-8 displayA"
        id="displayArea"
        style={{ width: "180vh" }}
      >
        <AuctionHistory />
      </div>
    </div>
  );
};

export default BiddingHistory;
