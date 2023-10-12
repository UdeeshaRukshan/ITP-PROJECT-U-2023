import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import React from "react";

import AdminDashboard from "./pages/AdminDashboard";
import Agent from "./pages/Agent";
import PaymentAdmin from "./pages/PaymentAdmin";
import Auction from "./pages/Auction";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/payment" element={<PaymentAdmin />} />
        <Route path="/auction" element={<Auction />} />
      </Routes>
    </div>
  );
}

export default App;
