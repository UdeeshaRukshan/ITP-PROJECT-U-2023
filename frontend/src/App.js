import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter

import CounterClass from "./components/CounterClass";
import CounterFunction from "./components/CounterFunction";
import Header from "./components/Header";
import PersonalDetails from "./components/PersonalDetails";
import ArtForm from "./components/ArtForm";
import VehicleForm from "./components/VehiclesForm";
import CollectableForm from "./components/CollectableForm";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Define your routes */}
        <Route path="/artform" element={<ArtForm />} />
        <Route path="/personaldetails" element={<PersonalDetails />} />
        <Route path="/vehicle" element={<VehicleForm />} />
        <Route path="/collectable" element={<CollectableForm />} />

        {/* Add other routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;
