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
import Payment from "./pages/Payment";
import Auction from "./pages/Auction";
import CustomerSupport from "./pages/CustomerSupport";
import Report from "./pages/Report";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashbord" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/auction" element={<Auction/>}/>
        <Route path="/customer" element={<CustomerSupport/>}/>
        <Route path="/report" element={<Report/>}/>
      </Routes>
    </div>
  );
}

export default App;
