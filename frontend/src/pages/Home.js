import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import ForumTable from "../components/home/ForumTable";
import ForumCard from "../components/home/FourmCard";



import "./Home.css"; // Import your custom CSS file

const Home = () => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/forums") // Updated URL to "/forums"
      .then((response) => {
        setForums(response.data.data);
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
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="title">Share your Knowledge with us</h1>
        <Link to="/forums/create" className="create-link"> {/* Updated create URL */}
          <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
            Create
          </button>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <ForumTable forums={forums} /> // Updated component name
      ) : (
        <ForumCard forums={forums} /> // Updated component name
      )}
    </div>
  );
};

export default Home;
