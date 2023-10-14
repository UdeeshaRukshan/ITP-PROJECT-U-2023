import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteForum = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteForum = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:4042/forums/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Article Deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
      className="container"
    >
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Delete Article</h1>
        {loading ? <Spinner /> : ""}
        <div
          style={{
            border: "2px solid #87CEEB",
            borderRadius: "8px",
            padding: "20px",
            width: "600px",
          }}
        >
          <h3 className="text-2xl">
            Are You Sure You want to delete this Article?
          </h3>
          <button
            style={{
              padding: "10px",
              backgroundColor: "#FF0000",
              color: "#FFFFFF",
              margin: "10px",
              width: "100%",
            }}
            onClick={handleDeleteForum}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteForum;