import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./CreateWishList.css"; // Update CSS file name if necessary

const CreateWishlist = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [content, setContent] = useState(""); // Added content state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveWishlist = () => {
    const data = {
      title,
      author,
      publishYear,
      content, // Include content in the data object
    };
    setLoading(true);
    axios
      .post("http://localhost:4000/wishlists", data) // Updated URL to "/wishlists"
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Wishlist Created successfully", { variant: "success" });
        navigate("/"); // Assuming you want to navigate back to the homepage
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Wishlist</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full h-48" // Adjust the height as needed
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveWishlist}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateWishlist;
