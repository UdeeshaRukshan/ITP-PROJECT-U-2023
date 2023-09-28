import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";


import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import "./Home.css"; // Import your custom CSS file

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/books")
      .then((response) => {
        setBooks(response.data.data);
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
        <h1 className="title">Books List</h1>
        <Link to="/books/create" className="create-link">
  <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">
    Create
  </button>
</Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
