import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter and Routes
import PaymentForm from "./components/payment/PaymentForm";
import PaymentList from "./components/payment/PaymentList";
import Review from "./components/payment/Review";
import Transaction from "./components/payment/Transaction";
import EditCard from "./components/payment/EditCard";


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
