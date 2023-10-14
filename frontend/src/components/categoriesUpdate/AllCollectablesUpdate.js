import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../components/categoriesUpdate/AllCollectablesUpdate.css";
import jsPDF from "jspdf";

export default function AllCollectablesUpdate() {
  const [collectables, setCollectables] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchCollectables() {
      try {
        const response = await axios.get(
          "http://localhost:4042/collectable/getcollectables"
        );
        setCollectables(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchCollectables();
  }, []);

  const handleDeleteClick = async (collectableId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:4042/collectable/deletecollectable/${collectableId}`
        );

        setCollectables((prevCollectables) =>
          prevCollectables.filter(
            (collectable) => collectable._id !== collectableId
          )
        );
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const generateReportForCollectable = (collectable) => {
    const doc = new jsPDF();
    doc.text(`Collectable Report - ${collectable.type}`, 10, 10);
    <br></br>;
    doc.text(`Collectable Type: ${collectable.type}`, 10, 30);
    <br></br>;
    doc.text(`Name: ${collectable.name}`, 10, 40);
    <br></br>;
    doc.text(`Description: ${collectable.description}`, 10, 50);
    <br></br>;
    doc.text(`Value ($): ${collectable.value}`, 10, 60);

    doc.save(`${collectable.type}_report.pdf`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderImages = (images) => {
    return images.map((image, index) => (
      <img key={index} src={image.dataUrl} alt={`Item ${index + 1}`} />
    ));
  };

  const renderCollectableRows = () => {
    const filteredCollectables = collectables.filter((collectable) =>
      collectable.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredCollectables.map((collectable) => (
      <tr key={collectable._id}>
        <td>{collectable.type}</td>
        <td>{collectable.name}</td>
        <td>{collectable.value}</td>
        <td>{collectable.description}</td>
        <td>{renderImages(collectable.images)}</td>
        <td>
          <Link to={`/updatecollectable/${collectable._id}`}>
            <button className="all-collectable-edit-button">Edit</button>
          </Link>
          <button
            className="delete-button-allcollec"
            onClick={() => handleDeleteClick(collectable._id)}
          >
            Delete
          </button>
          <button
            className="all-collectables-generate-report-button"
            onClick={() => generateReportForCollectable(collectable)}
          >
            Generate Report
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="all-collec-container">
      <h1 className="all-collec-header">All Items</h1>
      <div className="all-collectables-search-container">
        <input
          type="text"
          placeholder="Search by type of the collectables"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table className="all-collec-table">
        <thead className="all-collec-thread">
          <tr className="all-collec-tr">
            <th className="all-collec-th">Type</th>
            <th className="all-collec-th">Name</th>
            <th className="all-collec-th">Value($)</th>
            <th className="all-collec-th">Description</th>
            <th className="all-collec-th">Images</th>
            <th className="all-collec-th">Action</th>
          </tr>
        </thead>
        <tbody className="all-collec-tbody">{renderCollectableRows()}</tbody>
      </table>
    </div>
  );
}
