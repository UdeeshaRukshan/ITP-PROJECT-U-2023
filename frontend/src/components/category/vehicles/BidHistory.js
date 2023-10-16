import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

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
        console.log(response.data.bidd);
      } catch (err) {
        alert(err.message);
      }
    }
    getAuctionHis();
  }, [userID]);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "AuctionPal-Auction History",
    onAfterPrint: () => alert("Data Saved in PDF"),
  });

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
        style={{ marginLeft: "15vh", marginRight: "75vh", width: "120vh" }}
      >
        <table className="tbl">
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


