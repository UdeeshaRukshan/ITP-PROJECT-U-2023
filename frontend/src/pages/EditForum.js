import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";


const EditForum = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/forums/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setCreatedDate(response.data.createdDate);
        setContent(response.data.content);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error loading forum", { variant: "error" });
        console.log(error);
      });
  }, [id]);

  const containerStyle = {
    padding: "20px",
  };

  const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const formGroupStyle = {
    marginBottom: "20px",
  };

  const formLabelStyle = {
    fontSize: "20px",
    marginRight: "10px",
    color: "#888",
  };

  const formInputStyle = {
    border: "2px solid #ccc",
    padding: "4px",
    width: "100%",
  };

  const formButtonStyle = {
    padding: "10px",
    backgroundColor: "#87CEEB",
    margin: "10px",
    width: "100%",
  };

  const handleEditForum = () => {
    const data = {
      title,
      author,
      createdDate,
      content,
    };
    setLoading(true);
    axios
      .put(`http://localhost:4000/forums/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Forum Edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error editing forum", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div style={containerStyle}>
      <BackButton />
      <h1 style={{ fontSize: "24px", margin: "20px 0" }}>Edit Forum</h1>
      {loading ? <Spinner /> : ""}
      <div style={formContainerStyle} className="form-container">
        <div style={{ ...formGroupStyle, color: "red" }} className="form-group">
          <label style={{ ...formLabelStyle, color: "blue" }} className="form-label">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={formInputStyle}
          />
        </div>
        <div style={formGroupStyle} className="form-group">
          <label style={formLabelStyle} className="form-label">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={formInputStyle}
          />
        </div>
        <div style={formGroupStyle} className="form-group">
          <label style={formLabelStyle} className="form-label">
            Created Date
          </label>
          <input
            type="text"
            value={createdDate}
            onChange={(e) => setCreatedDate(e.target.value)}
            style={formInputStyle}
          />
        </div>
        <div style={formGroupStyle} className="form-group">
          <label style={formLabelStyle} className="form-label">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ ...formInputStyle, height: "100px" }}
          />
        </div>
        <button style={formButtonStyle} className="form-button" onClick={handleEditForum}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditForum;
