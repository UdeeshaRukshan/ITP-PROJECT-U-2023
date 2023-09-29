// EditCard.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditCard.css";

const EditCard = () => {
  // State to manage the card list
  const [cards, setCards] = useState([]);
  const [editCard, setEditCard] = useState(null);

  // Fetch card details from API
  useEffect(() => {
    axios
      .get("http://localhost:8070/payment/getpayments")
      .then((response) => {
        setCards(response.data); // Assuming API returns an array of payment data
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  // Function to handle editing a card
  const handleEditCard = (index) => {
    setEditCard({ ...cards[index], index });
  };

  // Function to handle updating a card
  const handleUpdateCard = () => {
    axios
      .put(
        `http://localhost:8070/payment/updatepayment/${editCard._id}`,
        editCard
      )
      .then((response) => {
        const updatedCard = response.data;
        const updatedCards = cards.map((c, index) =>
          index === editCard.index ? updatedCard : c
        );
        setCards(updatedCards);
        setEditCard(null); // Clear the editing state
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // Function to handle deleting a card
  const handleDeleteCard = (index) => {
    axios
      .delete(`http://localhost:8070/payment/deletepayment/${cards[index]._id}`)
      .then(() => {
        const updatedCards = cards.filter((_, i) => i !== index);
        setCards(updatedCards);
        setEditCard(null); // Clear the editing state
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="edit-card-container">
      <h2>Edit Card Details</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Card Name</th>
            <th>Card Number</th>
            <th>Expiry Date</th>
            <th>CVV</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {editCard && editCard.index === index ? (
                  <input
                    type="text"
                    value={editCard.cardName}
                    onChange={(e) =>
                      setEditCard({ ...editCard, cardName: e.target.value })
                    }
                  />
                ) : (
                  card.cardName
                )}
              </td>
              <td>
                {editCard && editCard.index === index ? (
                  <input
                    type="text"
                    value={editCard.cardNumber}
                    onChange={(e) =>
                      setEditCard({ ...editCard, cardNumber: e.target.value })
                    }
                  />
                ) : (
                  card.cardNumber
                )}
              </td>
              <td>
                {editCard && editCard.index === index ? (
                  <input
                    type="text"
                    value={editCard.expiryDate}
                    onChange={(e) =>
                      setEditCard({ ...editCard, expiryDate: e.target.value })
                    }
                  />
                ) : (
                  card.expiryDate
                )}
              </td>
              <td>
                {editCard && editCard.index === index ? (
                  <input
                    type="text"
                    value={editCard.cvv}
                    onChange={(e) =>
                      setEditCard({ ...editCard, cvv: e.target.value })
                    }
                  />
                ) : (
                  card.cvv
                )}
              </td>
              <td>
                {editCard && editCard.index === index ? (
                  <>
                    <button className="save-button" onClick={handleUpdateCard}>
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => setEditCard(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-button"
                      onClick={() => handleEditCard(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteCard(index)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditCard;
