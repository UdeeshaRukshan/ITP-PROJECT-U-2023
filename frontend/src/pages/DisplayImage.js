import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplayImage = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4042/image") // Fix the URL, add "http://"
      .then((response) => {
        const fetchedImageUrls = response.data;
        setImageUrls(fetchedImageUrls);
        // const filteredImages = imageUrls.filter(imageUrl => imageUrl.useremail === userEmail);
      })
      .catch((error) => {
        console.error(error);
        // Handle errors
      });
  }, []);

  return (
    <div>
      {imageUrls.length > 0 && (
        <img
          style={{ width: "20vh", height: "20vh" }}
          src={imageUrls[0].url} // Display the first image from the array
          alt={`Image 0`}
        />
      )}
    </div>
  );
};

export default DisplayImage;
