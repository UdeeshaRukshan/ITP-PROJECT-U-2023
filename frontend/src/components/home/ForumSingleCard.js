import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiGift } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import ForumModal from "./ForumModal";

const cardStyles = {
  border: "1px solid #ccc",
  padding: "10px",
  margin: "10px",
};

const titleStyles = {
  fontSize: "18px",
  marginBottom: "5px",
};

const contentStyles = {
  fontSize: "14px",
};

const iconStyles = {
  fontSize: "20px",
  marginLeft: "5px",
  cursor: "pointer",
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
        {/* <BiGift
          onClick={() => setShowModal(true)}
        /> */}
        <Link to={`/forums/details/${forum._id}`}>
          <BsInfoCircle style={iconStyles} />
        </Link>
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
