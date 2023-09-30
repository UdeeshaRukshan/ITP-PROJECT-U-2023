import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateWishlist from "./pages/CreateWishlist"; // Updated import
import ShowWishlist from "./pages/ShowWishlist"; // Updated import
import EditWishlist from "./pages/EditWishlist"; // Updated import
import DeleteWishlist from "./pages/DeleteWishlist"; // Updated import

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wishlists/create" element={<CreateWishlist />} /> {/* Updated route path */}
      <Route path="/wishlists/details/:id" element={<ShowWishlist />} /> {/* Updated route path */}
      <Route path="/wishlists/edit/:id" element={<EditWishlist />} /> {/* Updated route path */}
      <Route path="/wishlists/delete/:id" element={<DeleteWishlist />} /> {/* Updated route path */}
    </Routes>
  );
};

export default App;
