import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AllArts.css";

export default function AllArts() {
  const [arts, setArts] = useState([]);
  const [selectedArtId, setSelectedArtId] = useState(null);
  const selectedArtIdRef = useRef(null);
  const [updateFormData, setUpdateFormData] = useState({
    title: "",
    medium: "",
    height: "",
    width: "",
    condition: "",
    location: "",
    value: "",
    images: [],
  });

  const handleUpdateClick = (art) => {
    setSelectedArtId(art._id);
    selectedArtIdRef.current = art._id; // Set the ref
    setUpdateFormData({
      title: art.title,
      medium: art.medium,
      height: art.height,
      width: art.width,
      condition: art.condition,
      location: art.location,
      value: art.value,
      images: art.images,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({
      ...updateFormData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use selectedArtIdRef.current to get the selectedArtId
      const artId = selectedArtIdRef.current;
      await axios.put(
        `http://localhost:8070/art/updateart/${artId}`,
        updateFormData
      );
      // Reset the selectedArtId to null
      setSelectedArtId(null);
      // Optionally, you can refresh the art data to display the updated art list.
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    async function fetchArts() {
      try {
        const response = await axios.get("http://localhost:8070/art/getarts");
        setArts(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchArts();
  }, []);

  const renderImages = (images) => {
    return images.map((image, index) => (
      <img key={index} src={image.dataUrl} alt={`Art ${index + 1}`} />
    ));
  };

  const renderArtsRows = () => {
    return arts.map((art) => (
      <tr key={art._id}>
        <td>{art.title}</td>
        <td>{art.medium}</td>
        <td>{art.height}</td>
        <td>{art.width}</td>
        <td>{art.condition}</td>
        <td>{art.location}</td>
        <td>{art.value}</td>
        <td>{renderImages(art.images)}</td>
        <td>
          <div className="button-container">
            <button
              className="delete-button"
              onClick={() => handleDeleteClick(art._id)}
            >
              Delete
            </button>
            <button
              className="update-button"
              onClick={() => handleUpdateClick(art._id)}
            >
              Update
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  const handleDeleteClick = async (artId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this art piece?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8070/art/deleteart/${artId}`);
        setArts((prevArts) => prevArts.filter((art) => art._id !== artId));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Medium</th>
            <th>Height(cm)</th>
            <th>Width(cm)</th>
            <th>Condition</th>
            <th>Location</th>
            <th>Value($)</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderArtsRows()}</tbody>
      </table>

      {/* Modal for updating art details */}
      {selectedArtId && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedArtId(null)}>
              &times;
            </span>
            <h3>Update Art Details</h3>
            <form onSubmit={handleFormSubmit}>
              {/* Add your form fields here */}
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={updateFormData.title}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="medium">Medium</label>
                <input
                  type="text"
                  id="medium"
                  name="medium"
                  value={updateFormData.medium}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="height">Height (cm)</label>
                <input
                  type="text"
                  id="height"
                  name="height"
                  value={updateFormData.height}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="width">Width (cm)</label>
                <input
                  type="text"
                  id="width"
                  name="width"
                  value={updateFormData.width}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="condition">Condition</label>
                <input
                  type="text"
                  id="condition"
                  name="condition"
                  value={updateFormData.condition}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={updateFormData.location}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="value">Value ($)</label>
                <input
                  type="text"
                  id="value"
                  name="value"
                  value={updateFormData.value}
                  onChange={handleFormChange}
                />
              </div>
              {/* Add an input field for images if needed */}
              <div className="form-group">
                <label htmlFor="images">Images</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  //onChange={(e) => handleImageChange(e)}
                />
              </div>
              <button type="submit">Update Art</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
