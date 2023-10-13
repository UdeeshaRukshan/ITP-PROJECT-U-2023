import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateForum = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [createdDate, setCreatedDate] = useState("");

  const handleSaveForum = () => {
    setErrors({});

    const validationErrors = {};

    if (!title.trim()) {
      validationErrors.title = "Title is required";
    }

    if (!author.trim()) {
      validationErrors.author = "Author is required";
    } else if (!/^[A-Za-z\s]+$/.test(author)) {
      validationErrors.author = "Author can only contain letters and spaces";
    }

    if (!createdDate.trim()) {
      validationErrors.createdDate = "Created Date is required";
    }
    
    if (!content.trim()) {
      validationErrors.content = "Content is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      title,
      author,
      createdDate,
      content,
    };

    setLoading(true);
    axios
      .post("http://localhost:4000/forums", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Forum Created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const inputStyle = {
    border: "2px solid #ccc",
    padding: "4px",
    width: "100%",
  };

  const errorStyle = {
    color: "red",
  };

  return (
    <div style={{ padding: "20px" }}>
      <BackButton />
      <h1 style={{ fontSize: "24px", margin: "20px 0" }}>Create Forum</h1>
      {loading ? <Spinner /> : ""}
      <div style={{ border: "2px solid #87CEEB", borderRadius: "8px", padding: "20px", width: "600px", margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", marginRight: "10px", color: "#888" }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />
          {errors.title && <p style={errorStyle}>{errors.title}</p>}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", marginRight: "10px", color: "#888" }}>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={inputStyle}
          />
          {errors.author && <p style={errorStyle}>{errors.author}</p>}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", marginRight: "10px", color: "#888" }}>Created Date</label>
          <input
            type="date"
            value={createdDate}
            onChange={(e) => setCreatedDate(e.target.value)}
            style={inputStyle}
          />
          {errors.createdDate && <p style={errorStyle}>{errors.createdDate}</p>}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "20px", marginRight: "10px", color: "#888" }}>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ ...inputStyle, height: "100px" }}
          />
          {errors.content && <p style={errorStyle}>{errors.content}</p>}
        </div>
        <button style={{ padding: "10px", backgroundColor: "#87CEEB", margin: "10px" }} onClick={handleSaveForum}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateForum;
