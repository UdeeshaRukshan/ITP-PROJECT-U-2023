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
  const [createdDate, setCreatedDate] = useState(""); // Keep the variable name

  const handleSaveForum = () => {
    // Reset previous errors
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
      createdDate, // Use createdDate instead of a different variable
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

  return (
    <div className="container">
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Create Forum</h1>
        {loading ? <Spinner /> : ""}
        <div
          style={{
            border: "2px solid #87ceeb",
            borderRadius: "12px",
            width: "600px",
            padding: "16px",
            margin: "0 auto",
          }}
        >
          <div className="my-4">
            <label
              style={{ fontSize: "1.5rem", marginRight: "4px", color: "#808080" }}
            >
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                border: "2px solid #808080",
                padding: "8px",
                width: "100%",
              }}
            />
            {errors.title && (
              <p style={{ color: "red" }}>{errors.title}</p>
            )}
          </div>
          <div className="my-4">
            <label
              style={{ fontSize: "1.5rem", marginRight: "4px", color: "#808080" }}
            >
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={{
                border: "2px solid #808080",
                padding: "8px",
                width: "100%",
              }}
            />
            {errors.author && (
              <p style={{ color: "red" }}>{errors.author}</p>
            )}
          </div>
          <div className="my-4">
            <label
              style={{ fontSize: "1.5rem", marginRight: "4px", color: "#808080" }}
            >
              Created Date
            </label>
            <input
              type="date"
              value={createdDate}
              onChange={(e) => setCreatedDate(e.target.value)}
              style={{
                border: "2px solid #808080",
                padding: "8px",
                width: "100%",
              }}
            />
            {errors.createdDate && (
              <p style={{ color: "red" }}>{errors.createdDate}</p>
            )}
          </div>
          <div className="my-4">
            <label
              style={{ fontSize: "1.5rem", marginRight: "4px", color: "#808080" }}
            >
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                border: "2px solid #808080",
                padding: "8px",
                width: "100%",
                height: "48px",
              }}
            />
            {errors.content && (
              <p style={{ color: "red" }}>{errors.content}</p>
            )}
          </div>
          <button
            style={{
              padding: "8px",
              backgroundColor: "#87ceeb",
              margin: "8px",
            }}
            onClick={handleSaveForum}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateForum;
