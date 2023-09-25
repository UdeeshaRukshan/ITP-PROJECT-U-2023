
import React from 'react';

const Wishlist = ({ wishlist }) => {
  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlist.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
