import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiGift } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import WishlistModal from "./WishlistModal"; // Assuming you have a WishlistModal component
import "./WishlistSingleCard.css"; // Create a separate CSS file for your WishlistSingleCard styles

const WishlistSingleCard = ({ wishlist }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="wishlist-card">
      <h2 className="wishlist-title">Name: {wishlist.title}</h2>
      <h2 className="wishlist-title">Author: {wishlist.author}</h2>
      <h2 className="wishlist-title">Publish Year: {wishlist.publishYear}</h2>
      <p className="wishlist-title">Content: {wishlist.content}</p> {/* Display the 'content' field */}
      <div className="action-icons">
        <BiGift
          className="wishlist-icon"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/wishlists/details/${wishlist._id}`}>
          <BsInfoCircle className="info-icon" />
        </Link>
        <Link to={`/wishlists/edit/${wishlist._id}`}>
          <AiOutlineEdit className="edit-icon" />
        </Link>
        <Link to={`/wishlists/delete/${wishlist._id}`}>
          <MdOutlineDelete className="delete-icon" />
        </Link>
      </div>
      {showModal && (
        <WishlistModal wishlist={wishlist} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default WishlistSingleCard;
