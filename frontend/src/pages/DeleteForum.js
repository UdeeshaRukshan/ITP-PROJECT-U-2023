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
      .delete(`http://localhost:4000/forums/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Forum Deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false); // Corrected this line
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  const forumBoxStyle = {
    border: "2px solid #87CEEB",
    borderRadius: "8px",
    padding: "20px",
    width: "600px",
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#FF0000",
    color: "#FFFFFF",
    margin: "10px",
    width: "100%",
  };

  return (
    <div className="container">
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Delete Forum</h1>
        {loading ? <Spinner /> : ""}
        <div style={containerStyle}>
          <div style={forumBoxStyle}>
            <h3 className="text-2xl">Are You Sure You want to delete this forum?</h3>
            <button
              style={buttonStyle}
              onClick={handleDeleteForum}
            >
              Yes, Delete it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteForum;
