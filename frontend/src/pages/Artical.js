import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import ForumTable from "../components/home/ForumTable";
import ForumCard from "../components/home/FourmCard";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  maxWidth: "800px",
  margin: "0 auto",
  backgroundColor: "#FAF9F6",
  border: "1px solid #ccc", // Add border
  borderRadius: "5px", // Add border radius for rounded corners
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const buttonStyle = {
  backgroundColor: "#0000FF",
  padding: "4px 12px",
  borderRadius: "8px",
  marginRight: "10px",
  cursor: "pointer",
  fontFamily: "Sans-serif",
  width: "15vh",
  height: "5vh",
  color: "white",
};

const titleStyle = {
  fontSize: "24px",
  margin: "0",
  fontFamily: "Sans-serif",
};

const createLinkStyle = {
  textDecoration: "none",
  color: "white",
};

const createButtonStyle = {
  backgroundColor: "#87CEEB",
  padding: "4px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  textDecoration: "none",
  color: "white",
};

const Artical = () => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/forums") // Updated URL to "/forums"
      .then((response) => {
        setForums(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={buttonContainerStyle}>
        <button
          style={
            showType === "table"
              ? { ...buttonStyle, backgroundColor: "#0000FF" }
              : buttonStyle
          }
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          style={
            showType === "card"
              ? { ...buttonStyle, backgroundColor: "##0000FF" }
              : buttonStyle
          }
          onClick={() => setShowType("card")}
        >
          Articles
        </button>
      </div>
      <h1 style={titleStyle}>Learn about Auction</h1>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <ForumTable forums={forums} />
      ) : (
        <ForumCard forums={forums} />
      )}
    </div>
  );
};

export default Artical;
