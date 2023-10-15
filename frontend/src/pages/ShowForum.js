import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
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
const ShowForum = () => {
  const [wishlist, setWishlist] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4042/wishlists/${id}`) // Update URL to match your wishlist endpoint
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
      <h1 className="text-3xl my-4">Show Wishlist</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{wishlist.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{wishlist.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{wishlist.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Content</span>
            <span>{wishlist.content}</span>
          </div>
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

export default ShowForum;
