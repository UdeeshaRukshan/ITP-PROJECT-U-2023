import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import BookModal from "./BookModal";
import "./BookSingleCard.css";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="book-card1">
      <h2 className="publish-year-badge1">{book.publishYear}</h2>
      <h4 className="book-id1">{book._id}</h4>
      <div className="book-info1">
        <PiBookOpenTextLight className="book-icon1" />
        <h2 className="book-title1">{book.title}</h2>
      </div>
      <div className="book-info1">
        <BiUserCircle className="author-icon1" />
        <h2 className="book-author1">{book.author}</h2>
      </div>
      <div className="action-icons1">
        <BiShow
          className="show-icon1"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className="info-icon" />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className="edit-icon" />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className="delete-icon" />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
