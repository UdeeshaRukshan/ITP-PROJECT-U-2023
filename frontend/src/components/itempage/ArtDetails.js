import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ArtDetails({ match }) {
  const [art, setArt] = useState(null);

  useEffect(() => {
    const fetchArtDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4042/art/getart/${match.params.artid}`
        );
        setArt(response.data.Art);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArtDetails();
  }, [match.params.artid]);

  if (!art) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{art.title}</h2>
      <p>Medium: {art.medium}</p>
      <p>
        Size: {art.height} x {art.width}
      </p>
      <p>Condition: {art.condition}</p>
      <p>Location: {art.location}</p>
      <p>Value: {art.value}</p>
      {art.images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${art.title} - Image ${index + 1}`}
        />
      ))}
    </div>
  );
}
