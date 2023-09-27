import React from "react";
import PaymentForm from "./components/paymentUdeesha/paymentForm";
import PaymentList from "./components/paymentUdeesha/PaymentList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter and Routes

function App() {
  return (
    <Router>
      <Routes>
        {" "}
        {/* Use <Routes> */}
        <Route path="/payment" element={<PaymentForm />} />{" "}
        {/* Use "element" */}
        <Route path="/paymentlist" element={<PaymentList />} />{" "}
        {/* Use "element" */}
      </Routes>
    </Router>
  );
}

export default App;
