import React from 'react';

function Wishlist({ wishlist, onRemoveFromWishlist }) {
  return (
    <div className="wishlist">
      <h2>Wishlist</h2>
      {wishlist.map((item) => (
        <div key={item._id} className="wishlist-item">
          <h3>{item.name}</h3>
          <button onClick={() => onRemoveFromWishlist(item)}>Remove from Wishlist</button>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
