import React, { useState } from "react";

function PaymentHistoryTable() {
  // Mock payment history data
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      date: "2023-09-30",
      amount: 23.45,
      status: "Success",
    },
    // Add more payment history entries as needed
  ]);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);

  // Edit form state
  const [editPayment, setEditPayment] = useState({
    id: null,
    date: "",
    amount: 0,
    status: "",
  });

  // Toggle edit mode
  const toggleEdit = (payment) => {
    setIsEditing(true);
    setEditPayment({ ...payment });
  };

  // Save edited payment
  const saveEdit = () => {
    // Update the payment in the paymentHistory array
    const updatedPaymentHistory = paymentHistory.map((payment) =>
      payment.id === editPayment.id ? editPayment : payment
    );

    setPaymentHistory(updatedPaymentHistory);
    setIsEditing(false);
  };

  // Delete payment
  const deletePayment = (id) => {
    const updatedPaymentHistory = paymentHistory.filter(
      (payment) => payment.id !== id
    );

    setPaymentHistory(updatedPaymentHistory);
  };

  return (
    <div>
      <h2>Your Payment History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.date}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.status}</td>
              <td>
                {isEditing && editPayment.id === payment.id ? (
                  <React.Fragment>
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button onClick={() => toggleEdit(payment)}>Edit</button>
                    <button onClick={() => deletePayment(payment.id)}>Delete</button>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentHistory;
