import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./CreateForum.css";

const CreateForum = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [publishYear, setPublishYear] = useState(null);

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

    if (!publishYear.trim() || isNaN(publishYear) || +publishYear < 0) {
      validationErrors.publishYear = "Invalid publish year";
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
      publishYear,
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
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Forum</h1>
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
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          {errors.author && <p className="text-red-500">{errors.author}</p>}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          {errors.publishYear && <p className="text-red-500">{errors.publishYear}</p>}
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full h-48"
          />
          {errors.content && <p className="text-red-500">{errors.content}</p>}
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveForum}>
          Save
        </button>
      </div>
    </div>
  );
};
export default CreateForum;