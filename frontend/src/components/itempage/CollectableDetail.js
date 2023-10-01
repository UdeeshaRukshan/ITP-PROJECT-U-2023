import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CollectableDetails = () => {
  const { auctioneerId } = useParams();
  const [auctioneer, setAuctioneer] = useState(null);

  useEffect(() => {
    async function fetchAuctioneerDetails() {
      try {
        const response = await axios.get(
          `http://localhost:4042/auctioneer/get/${auctioneerId}`
        );
        console.log("Response:", response); // Check the response in the console
        setAuctioneer(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchAuctioneerDetails();
  }, [auctioneerId]);
  return (
    <div>
      <h2>Auctioneer Details</h2>
      {auctioneer ? (
        <div>
          <p>Auctioneer ID: {auctioneer._id}</p>
          <p>First Name: {auctioneer.firstName}</p>
          <p>Last Name: {auctioneer.lastName}</p>
          {/* Display other auctioneer details here */}
        </div>
      ) : (
        <p>Loading auctioneer details...</p>
      )}
    </div>
  );
};

export default CollectableDetails;
