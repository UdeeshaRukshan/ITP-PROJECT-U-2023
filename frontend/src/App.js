import React from "react";
import { Routes, Route } from "react-router-dom";
import Artical from "./pages/Artical";
import CreateForum from "./pages/CreateForum"; // Import the appropriate component for creating forums
import ShowForum from "./pages/ShowForum"; // Import the appropriate component for displaying a single forum
import EditForum from "./pages/EditForum"; // Import the appropriate component for editing forums
import DeleteForum from "./pages/DeleteForum"; // Import the appropriate component for deleting forums

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Artical />} />
      <Route path="/forums/create" element={<CreateForum />} />{" "}
      {/* Route for creating a new forum */}
      <Route path="/forums/:id" element={<ShowForum />} />{" "}
      {/* Route for displaying a single forum */}
      <Route path="/forums/edit/:id" element={<EditForum />} />{" "}
      {/* Route for editing a forum */}
      <Route path="/forums/delete/:id" element={<DeleteForum />} />{" "}
      {/* Route for deleting a forum */}
    </Routes>
  );
};

export default App;
