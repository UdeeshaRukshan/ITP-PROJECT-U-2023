import { cloudName } from "/Users/udeesharukshan/Documents/MERN STACK 2022(GITHUB)/ITP-PROJECT-U-2023/frontend/src/cloudinary/cloudinaryConfig.js"; // Import your cloudinaryConfig
import { useState, useEffect } from "react";
const Vehicle = () => {
  const [images, setImages] = useState([]);

  // Fetch the images from your backend when the component mounts
  useEffect(() => {
    // Replace with your actual API endpoint to fetch images from MongoDB
    fetch("/api/getimages")
      .then((response) => response.json())
      .then((data) => {
        setImages(data); // Assuming the API response is an array of image objects
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  return (
    <div>
      <h2>Uploaded Images</h2>
      <div className="image-list">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img
              src={`https://res.cloudinary.com/${cloudName}/image/upload/${image.imageUrl}`}
              alt={`Image ${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicle;
