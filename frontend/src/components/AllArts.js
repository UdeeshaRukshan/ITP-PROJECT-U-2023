import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AllArts.css';

export default function AllArts() {
  const [arts, setArts] = useState([]);
  const [editingArtId, setEditingArtId] = useState(null);

  useEffect(() => {
    async function fetchArts() {
      try {
        const response = await axios.get('http://localhost:8070/art/getarts');
        setArts(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchArts();
  }, []);

  const handleDeleteArt = async (artId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this art piece?');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8070/art/deleteart/${artId}`);
        // Update the state to remove the deleted art
        setArts((prevArts) => prevArts.filter((art) => art._id !== artId));
      } catch (error) {
        alert(error.message);
      }
    }
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
        <td>{art.images}</td>
        <td>
  <div className="all-arts-button-container">
    <Link to={`/updateart/${art._id}`}>
      <button className="all-arts-edit-button">Edit</button>
    </Link>
    <button className="delete-button-allarts" onClick={() => handleDeleteArt(art._id)}>Delete</button>
  </div>
</td>
      </tr>
    ));
  };

  return (
    <div className="all-arts-container">
      <h1 className="all-arts-header-center">All Arts</h1>
      <table className="all-arts-table">
        <thead className="all-arts-thread">
          <tr className="tr-all-arts">
            <th className="all-arts-th">Title</th>
            <th className="all-arts-th">Medium</th>
            <th className="all-arts-th">Height(cm)</th>
            <th className="all-arts-th">Width(cm)</th>
            <th className="all-arts-th">Condition</th>
            <th className="all-arts-th">Location</th>
            <th className="all-arts-th">Value($)</th>
            <th className="all-arts-th">Images</th>
            <th className="all-arts-th">Actions</th>
          </tr>
        </thead>
        <tbody className="all-arts-tbody">{renderArtsRows()}</tbody>
      </table>
    </div>
  );
}
