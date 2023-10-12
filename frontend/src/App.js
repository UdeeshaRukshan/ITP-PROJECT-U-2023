import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import React from "react";

import Header from "./components/Header";

import AdminDashboard from "./pages/AdminDashboard";
import Agent from "./pages/Agent";
import Payment from "./pages/Payment";
import Auction from "./pages/Auction";
import AdminSupport from "./pages/AdminSupport";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/adminsupport" element={<AdminSupport />} />
      </Routes>
    </div>
  );
}

export default App;
