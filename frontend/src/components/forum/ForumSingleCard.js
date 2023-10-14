import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import ForumModal from "./ForumModal";

const cardStyles = {
  border: "1px solid #ccc",
  padding: "10px",
  margin: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  borderRadius: "5px",
  height: "auto",
  overflowY: "auto",
  transition: "box-shadow 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
  },
};

const titleStyles = {
  fontSize: "18px",
  marginBottom: "5px",
  color: "#333",
  fontWeight: "bold",
  fontFamily: "Sans-serif",
};

const contentStyles = {
  fontSize: "18px",
  marginBottom: "5px",
  color: "#333",
  fontWeight: "bold",
  fontFamily: "Sans-serif",
  backgroundColor: "yellow", // Add this line to highlight
};


const iconStyles = {
  fontSize: "20px",
  marginLeft: "5px",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.2)",
  },
};

const buttonStyles = {
  display: "flex",
  alignItems: "center",
  marginTop: "10px",
};

const likeButtonStyles = {
  fontSize: "20px",
  cursor: "pointer",
  marginRight: "10px",
};

const dislikeButtonStyles = {
  fontSize: "20px",
  cursor: "pointer",
};

const ForumSingleCard = ({ forum }) => {
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <div style={cardStyles}>
      <h2 style={titleStyles}>Title: {forum.title}</h2>
      <h2 style={titleStyles}>Author: {forum.author}</h2>
      <h2 style={titleStyles}>Created Date: {forum.createdDate}</h2>
      <p style={contentStyles}>Content: {forum.content}</p>

      <div style={buttonStyles}>
        <span style={likeButtonStyles} onClick={handleLike}>
          &#128077; {likes}
        </span>
        <span style={dislikeButtonStyles} onClick={handleDislike}>
          &#128078; {dislikes}
        </span>
      </div>

      {showModal && (
        <ForumModal forum={forum} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ForumSingleCard;