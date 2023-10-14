import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditForum = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [createdDate, setCreatedDate] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    width: "600px",
    margin: "0 auto",
    marginTop: "10vh",
  };

  const inputStyle = {
    border: "2px solid #808080",
    padding: "8px",
    width: "100%",
  };

  const buttonStyle = {
    padding: "8px",
    backgroundColor: "#0000FF",
    margin: "8px",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const errorStyle = {
    color: "red",
  };

  const [errors, setErrors] = useState({
    title: "",
    author: "",
    createdDate: "",
  });

  const validateInputs = () => {
    const newErrors = {
      title: "",
      author: "",
      createdDate: "",
    };

    const lettersPattern = /^[A-Za-z]+$/;

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    } else if (!lettersPattern.test(title)) {
      newErrors.title = "Title should contain only letters.";
    }

    if (!author.trim()) {
      newErrors.author = "Author is required.";
    } else if (!lettersPattern.test(author)) {
      newErrors.author = "Author should contain only letters.";
    }

    if (!createdDate) {
      newErrors.createdDate = "Created Date is required.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4042/forums/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setCreatedDate(
          response.data.createdDate ? new Date(response.data.createdDate) : null
        );
        setContent(response.data.content);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error loading forum", { variant: "error" });
        console.log(error);
      });
  }, [id]);

  const handleEditForum = () => {
    if (validateInputs()) {
      const data = {
        title,
        author,
        createdDate: createdDate ? createdDate.toISOString() : null,
        content,
      };
      setLoading(true);
      axios
        .put(`http://localhost:4042/forums/${id}`, data)
        .then(() => {
          setLoading(false);
          enqueueSnackbar("Article Edited successfully", {
            variant: "success",
          });
          navigate("/");
        })
        .catch((error) => {
          setLoading(false);
          enqueueSnackbar("Error editing Article", { variant: "error" });
          console.log(error);
        });
    }
  };

  return (
    <div style={containerStyle}>
      <BackButton />
      <h1
        style={{ fontSize: "24px", margin: "20px 0", fontFamily: "Sans-serif" }}
      >
        Edit Forum
      </h1>
      {loading ? <Spinner /> : ""}
      <div>
        <div style={{ margin: "16px 0" }}>
          <label
            style={{ fontSize: "1.5rem", marginRight: "4px", color: "#808080" }}
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors({ ...errors, title: "" });
            }}
            onBlur={validateInputs}
            style={inputStyle}
          />
          <div style={errorStyle}>{errors.title}</div>
        </div>
        <div style={{ margin: "16px 0" }}>
          <label
            style={{ fontSize: "1.5rem", marginRight: "4px", color: "#808080" }}
          >
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              setErrors({ ...errors, author: "" });
            }}
            onBlur={validateInputs}
            style={inputStyle}
          />
          <div style={errorStyle}>{errors.author}</div>
        </div>
        <div style={{ margin: "16px 0" }}>
          <label
            style={{ fontSize: "1.5rem", marginRight: "4px", color: "#808080" }}
          >
            Created Date
          </label>
          <ReactDatePicker
            selected={createdDate}
            onChange={(date) => {
              setCreatedDate(date);
              setErrors({ ...errors, createdDate: "" });
            }}
            onBlur={validateInputs}
            dateFormat="yyyy-MM-dd"
            style={inputStyle}
          />
          <div style={errorStyle}>{errors.createdDate}</div>
        </div>
        <div style={{ margin: "16px 0" }}>
          <label
            style={{ fontSize: "1.5rem", marginRight: "4px", color: "#808080" }}
          >
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              ...inputStyle,
              height: "100px",
            }}
          />
        </div>
        <button style={buttonStyle} onClick={handleEditForum}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditForum;
