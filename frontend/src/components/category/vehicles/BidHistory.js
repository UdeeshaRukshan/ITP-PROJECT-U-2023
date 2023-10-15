import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { useReactToPrint } from "react-to-print";

export default function AuctionHistory() {
    const [auctions, setAuctions] = useState([]);
    const [user, setUsers] = useState([]);

    const componentPDF = useRef();
    const userID = user.email; 

    useEffect(() => {
        axios.get("http://localhost:4042/dashbord", {
            withCredentials: true,
        }).then((response) => {
            setUsers(response.data);
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, []);

    useEffect(() => {
        async function getAuctionHis() {
            try {
                const response = await axios.get(`http://localhost:4042/BidHistory/get/${userID}`);
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
        documentTitle: "Auction History",
        onAfterPrint: () => alert("Data Saved in PDF")
    });

    return (
        <div className="container">
            <h1>Auction History</h1>
            <hr/>
            <div ref={componentPDF} style={{ width: '100%' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>User Email</th>
                            <th>Bid Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auctions.map((auction) => (
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
                <button className="btn btn-primary" onClick={generatePDF}>Print</button>
            </div>
        </div>
    );
}
