import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AllArts.css';
import jsPDF from 'jspdf';

export default function AllArts() {
  const [arts, setArts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
        setArts((prevArts) => prevArts.filter((art) => art._id !== artId));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const generateReportForArt = (art) => {
    const doc = new jsPDF();
    doc.text(`Art Report - ${art.title}`, 10, 10);<br></br>
    doc.text(`Art Title: ${art.title}`, 10, 30);<br></br>
    doc.text(`Medium: ${art.medium}`, 10, 40);<br></br>
    doc.text(`Height (cm): ${art.height}`, 10, 50);<br></br>
    doc.text(`Width (cm): ${art.width}`, 10, 60);<br></br>
    doc.text(`Condition: ${art.condition}`, 10, 70);<br></br>
    doc.text(`Location: ${art.location}`, 10, 80);<br></br>
    doc.text(`Value ($): ${art.value}`, 10, 90);

    doc.save(`${art.title}_report.pdf`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderArtsRows = () => {
    const filteredArts = arts.filter((art) =>
      art.medium.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredArts.map((art) => (
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
          <Link to={`/updateart/${art._id}`}>
            <button className="all-arts-edit-button">Edit</button>
          </Link>
          <button className="delete-button-allarts" onClick={() => handleDeleteArt(art._id)}>
            Delete
          </button>
          <button className="all-arts-generate-report-button" onClick={() => generateReportForArt(art)}>
            Generate Report
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="all-arts-container">
      <h1 className="all-arts-header-center">All Arts</h1><br></br>
      <div className="all-arts-search-container">
        <input
          type="text"
          placeholder="Search by medium of the arts"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div><br></br>
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
