import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Make sure to import BrowserRouter

import React from "react";
import Checkout from "./components/payment/Checkout";
import PaymentHistory from "./components/PaymentHistory";

function App() {
  return (
    <Router>
      {" "}
      {/* Wrap your entire application with the Router component */}
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/history" element={<PaymentHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
