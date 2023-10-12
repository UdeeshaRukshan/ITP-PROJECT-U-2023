import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiGift } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import ForumModal from "./ForumModal"; // Assuming you have a ForumModal component
import "./ForumSingleCard.css"; // Create a separate CSS file for your ForumSingleCard styles

const ForumSingleCard = ({ forum }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="forum-card">
      <h2 className="forum-title">Title: {forum.title}</h2>
      <h2 className="forum-title">Author: {forum.author}</h2>
      <h2 className="forum-title">Publish Year: {forum.publishYear}</h2>
      <p className="forum-title">Content: {forum.content}</p> {/* Display the 'content' field */}
      <div className="action-icons">
        <BiGift
          className="forum-icon"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/forums/details/${forum._id}`}>
          <BsInfoCircle className="info-icon" />
        </Link>
        <Link to={`/forums/edit/${forum._id}`}>
          <AiOutlineEdit className="edit-icon" />
        </Link>
        <Link to={`/forums/delete/${forum._id}`}>
          <MdOutlineDelete className="delete-icon" />
        </Link>
      </div>
      {showModal && (
        <ForumModal forum={forum} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ForumSingleCard;
