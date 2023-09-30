import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import "./ShowWishlist.css";

const ShowWishlist = () => { // Updated component name to ShowWishlist
  const [wishlist, setWishlist] = useState({}); // Updated state variable name to wishlist
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/wishlists/${id}`) // Updated URL to "/wishlists/:id"
      .then((response) => {
        setWishlist(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Wishlist</h1> {/* Updated title */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{wishlist._id}</span> {/* Updated property to wishlist._id */}
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Wishlist Title</span> {/* Updated label */}
            <span>{wishlist.title}</span> {/* Updated property to wishlist.title */}
          </div>
          {/* Add more fields specific to your wishlist model */}
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(wishlist.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(wishlist.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowWishlist;
