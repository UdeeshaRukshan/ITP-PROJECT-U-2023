import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import WishlistsTable from "../components/home/WishlistTable"; // Import the appropriate component for wishlists
import WishlistsCard from "../components/home/WishlistCard"; // Import the appropriate component for wishlists
import "./Home.css"; // Import your custom CSS file

const Home = () => {
  const [wishlists, setWishlists] = useState([]); // Update state variable name to wishlists
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/wishlists") // Updated URL to "/wishlists"
      .then((response) => {
        setWishlists(response.data.data); // Updated state variable to wishlists
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="custom-home-container">
      <div className="button-container">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover.bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="title">WishList</h1> {/* Updated title */}
        <Link to="/wishlists/create" className="create-link"> {/* Updated create URL */}
          <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
            Create
          </button>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <WishlistsTable wishlists={wishlists} />
      ) : (
        <WishlistsCard wishlists={wishlists} /> 
      )}
    </div>
  );
};

export default Home;
