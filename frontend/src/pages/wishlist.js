// Wishlist.js
import React from "react";
import { useCart } from "../components/wishlistcom/CartContext";

export default function Wishlist() {
  const { cart } = useCart();

  return (
    <div>
      <h2>Wishlist</h2>
      {cart.map((property) => (
        <div key={property._id}>
          <h3>{property.address}</h3>
          <p>${property.price}</p>
        </div>
      ))}
    </div>
  );
}
