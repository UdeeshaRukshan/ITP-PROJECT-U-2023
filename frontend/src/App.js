import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import React from "react";

import Header from "./components/Header";
import Home from "./pages/Home";

import Dashboard from "./pages/Dashbord";
import AdminDashboard from "./pages/AdminDashboard";
import Agent from "./pages/Agent";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashbord" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/agent" element={<Agent />} />
      </Routes>
    </div>
  );
}

export default App;
