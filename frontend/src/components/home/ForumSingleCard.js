import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import ForumModal from "./ForumModal"; // Make sure you import the ForumModal component

const cardStyles = {
  border: "1px solid #ccc",
  padding: "10px",
  margin: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  borderRadius: "5px",
  height: "300px", // Set a fixed height for the card
  overflowY: "auto", // Enable vertical scrollbar when content overflows
  transition: "box-shadow 0.3s ease-in-out", // Add a transition for box-shadow
  cursor: "pointer", // Change the cursor on hover
  "&:hover": {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)", // Box-shadow on hover
  },
};

const titleStyles = {
  fontSize: "18px",
  marginBottom: "5px",
  color: "#333",
  fontWeight: "bold",
};

const contentStyles = {
  fontSize: "18px",
  marginBottom: "5px",
  color: "#333",
  fontWeight: "bold",
};

const iconStyles = {
  fontSize: "20px",
  marginLeft: "5px",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.2)", // Scale up the icon on hover
  },
};


const ForumSingleCard = ({ forum }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={cardStyles}>
      <h2 style={titleStyles}>Title: {forum.title}</h2>
      <h2 style={titleStyles}>Author: {forum.author}</h2>
      <h2 style={titleStyles}>Created Date: {forum.createdDate}</h2>
      <p style={contentStyles}>Content: {forum.content}</p>
      <div style={iconStyles}>
        <Link to={`/forums/edit/${forum._id}`}>
          <AiOutlineEdit style={iconStyles} />
        </Link>
        <Link to={`/forums/delete/${forum._id}`}>
          <MdOutlineDelete style={iconStyles} />
        </Link>
      </div>
      {showModal && (
        <ForumModal forum={forum} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ForumSingleCard;
