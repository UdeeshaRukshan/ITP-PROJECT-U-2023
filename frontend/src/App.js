import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ItemPage from "./components/ItemPage";
import WishlistPage from "./components/WishlistPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ItemPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
    </Routes>
  );
}

export default App;
