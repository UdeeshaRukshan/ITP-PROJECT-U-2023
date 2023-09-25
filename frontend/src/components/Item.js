
import React from 'react';

const Item = ({ item, addToWishlist }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <button onClick={() => addToWishlist(item._id)}>Add to Wishlist</button>
    </div>
  );
};

export default Item;
