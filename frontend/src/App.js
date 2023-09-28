import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter and Routes
import PaymentForm from "./components/payments/paymentForm";
import PaymentList from "./components/payments/PaymentList";
import Review from "./components/payments/Review";
import Transaction from "./components/payments/Transaction";
import EditCard from "./components/payments/EditCard";


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
        <Route path="/review" element={<Review/>} />{" "}
        <Route path="/transaction" exact element={<Transaction/>} />{" "}
        <Route path="/edit-card" element={<EditCard/>} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
