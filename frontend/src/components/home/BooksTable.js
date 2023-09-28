import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import "./BooksTable.css";

const BooksTable = ({ books }) => {
  return (
    <table className="table1">
      <thead>
        <tr>
          <th className="table-header">No</th>
          <th className="table-header">Title</th>
          <th className="table-header hidden md:table-cell">Author</th>
          <th className="table-header hidden md:table-cell">Publish Year</th>
          <th className="table-header">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id}>
            <td className="table-cell">{index + 1}</td>
            <td className="table-cell">{book.title}</td>
            <td className="table-cell hidden md:table-cell">{book.author}</td>
            <td className="table-cell hidden md:table-cell">
              {book.publishYear}
            </td>
            <td className="table-cell">
              <div className="operation-icons">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="icon info-icon" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="icon edit-icon" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="icon delete-icon" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
