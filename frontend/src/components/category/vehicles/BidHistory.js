import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "../vehicles/AuctionPal.png"
export default function AuctionHistory() {
  const [auctions, setAuctions] = useState([]);
  const [user, setUsers] = useState({});
  const [searchItem, setSearchItem] = useState(""); // State for search input

  const componentPDF = useRef();
  const userID = user.email;

  useEffect(() => {
    axios
      .get("http://localhost:4042/dashbord", {
        withCredentials: true,
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    async function getAuctionHis() {
      try {
        const response = await axios.get(
          `http://localhost:4042/BidHistory/get/${userID}`
        );
        setAuctions(response.data.bidd);
      } catch (err) {
        alert(err.message);
      }
    }
    getAuctionHis();
  }, [userID]);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.text("AuctionPal", 10, 10);
    doc.text("Order History", 10, 20); // Display "Order History" after "AuctionPal"

    const icon = new Image();
    icon.src = "./AuctionPal.png"; 

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.drawImage(icon, 0, 0);
    const dataURL = canvas.toDataURL("image/png");

    doc.addImage(dataURL, "PNG", 10, 30, 20, 20);

    doc.autoTable({
      head: [["Item ID", "User Email", "Bid Value"]],
      body: filteredAuctions.map((auction) => [
        auction.itemId,
        auction.userId,
        auction.bidValue,
      ]),
    });

    doc.save("AuctionPal-AuctionHistory.pdf");
  };

  // Function to filter auctions based on searchItem
  const filteredAuctions = auctions.filter((auction) =>
    auction.itemId.includes(searchItem)
  );

  return (
    <div className="bidHistory">
      <h1 style={{ marginLeft: "15vh" }}>Auction History</h1>
      <hr style={{ marginLeft: "15vh", marginRight: "45vh" }} />

      {/* Add a search input */}
      <div style={{ marginLeft: "15vh" }}>
        <input
          type="text"
          placeholder="Search by Item ID"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>

      <div
        ref={componentPDF}
        style={{ marginLeft: "15vh", marginRight: "15vh", width: "120vh" }}
      >
        <table className="tb">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>User Email</th>
              <th>Bid Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredAuctions.map((auction) => (
              <tr key={auction._id}>
                <td>{auction.itemId}</td>
                <td>{auction.userId}</td>
                <td>{auction.bidValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button
          className="btn btn-primary"
          onClick={generatePDF}
          style={{ marginLeft: "100vh", marginTop: "10px" }}
        >
          Print
        </button>
      </div>
    </div>
  );
}
