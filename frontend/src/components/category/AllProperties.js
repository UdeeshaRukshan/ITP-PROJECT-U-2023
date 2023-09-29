import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./AllProperties.css"; // Import CSS file
import { useCart } from "../wishlistcom/CartContext";
export default function AllProperties() {
  // State to store properties data
  const [properties, setProperties] = useState([]);
  const { addToCart } = useCart();
  // Fetch properties data from the server
  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await axios.get(
          "http://localhost:4042/property/getproperties"
        );
        setProperties(response.data);
      } catch (error) {
        alert(error.message);
      }
    }

    fetchProperties();
  }, []);

  // Render property items in a catalog-like box
  const renderPropertyItems = () => {
    return properties.map((property) => (
      <div key={property._id} className="catalog-item">
        <div className="item-image">
          <img
            src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg" // Use property-specific image URL
            alt={`Property ${property._id}`}
          />
        </div>
        <div className="item-details">
          <h3>{property.address}</h3>
          <p className="price">${property.price}</p> {/* Add price */}
        </div>
        <div className="item-actions">
          <Link
            to={`/property/${property._id}`}
            className="view-details-button"
          >
            View Details
          </Link>
          <button
            className="view-details-button
          "
            onClick={() => addToCart(property)}
          >
            Add to Cart
          </button>{" "}
          {/* Add to cart button */}
        </div>
      </div>
    ));
  };

  // Return the JSX for rendering
  return <div className="catalog-container">{renderPropertyItems()}</div>;
}
