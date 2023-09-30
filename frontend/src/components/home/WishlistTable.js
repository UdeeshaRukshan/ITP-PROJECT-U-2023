import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import "./WishlistTable.css"; // Update the CSS file name accordingly

const WishlistTable = ({ wishlists }) => {
  return (
    <table className="table1">
      <thead>
        <tr>
          <th className="table-header">No</th>
          <th className="table-header">Name</th>
          <th className="table-header hidden md:table-cell">Owner</th>
          <th className="table-header hidden md:table-cell">Creation Date</th>
          <th className="table-header">Operations</th>
        </tr>
      </thead>
      <tbody>
        {wishlists.map((wishlist, index) => (
          <tr key={wishlist._id}>
            <td className="table-cell">{index + 1}</td>
            <td className="table-cell">{wishlist.title}</td>
            <td className="table-cell hidden md:table-cell">{wishlist.author}</td>
            <td className="table-cell hidden md:table-cell">
              {wishlist.publishYear}
            </td>
            <td className="table-cell">
              <div className="operation-icons">
                <Link to={`/wishlists/details/${wishlist._id}`}>
                  <BsInfoCircle className="icon info-icon" />
                </Link>
                <Link to={`/wishlists/edit/${wishlist._id}`}>
                  <AiOutlineEdit className="icon edit-icon" />
                </Link>
                <Link to={`/wishlists/delete/${wishlist._id}`}>
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

export default WishlistTable;
