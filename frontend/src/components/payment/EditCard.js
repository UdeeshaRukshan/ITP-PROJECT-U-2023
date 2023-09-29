import React, { useState } from "react";
import "./EditCard.css";

const EditCard = () => {
  // Sample initial card data (you can replace it with actual data)
  const initialCards = [
    { id: 1, cardName: "Visa", cardNumber: "**** **** **** 1234", expiryDate: "12/25", cvv: "123" },
    { id: 2, cardName: "Visa", cardNumber: "**** **** **** 5678", expiryDate: "09/24", cvv: "456" },
    { id: 3, cardName: "Visa", cardNumber: "**** **** **** 5678", expiryDate: "09/24", cvv: "456" },
    { id: 4, cardName: "Visa", cardNumber: "**** **** **** 5678", expiryDate: "09/24", cvv: "456" },
    { id: 5, cardName: "Visa", cardNumber: "**** **** **** 5678", expiryDate: "09/24", cvv: "456" },
    { id: 6, cardName: "Visa", cardNumber: "**** **** **** 5678", expiryDate: "09/24", cvv: "456" },
  ];

  // State to manage the card list
  const [cards, setCards] = useState(initialCards);

  // State to track the card being edited (if any)
  const [editCard, setEditCard] = useState(null);

  // Function to handle editing a card
  const handleEditCard = (card) => {
    setEditCard(card);
  };

  // Function to handle updating a card
  const handleUpdateCard = (updatedCard) => {
    const updatedCards = cards.map((card) =>
      card.id === updatedCard.id ? updatedCard : card
    );
    setCards(updatedCards);
    setEditCard(null); // Clear the editing state
  };

  // Function to handle deleting a card
  const handleDeleteCard = (cardId) => {
    const updatedCards = cards.filter((card) => card.id !== cardId);
    setCards(updatedCards);
  };

  return (
    <div className = "edit-card-container">
      <h2>Edit Card Details</h2>
      <table>
        <thead>
          <tr>
            <th>Card Name</th>
            <th>Card Number</th>
            <th>Expiry Date</th>
            <th>CVV</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              <td>{editCard?.id === card.id ? <input type="text" defaultValue={card.cardName} /> : card.cardName}</td>
              <td>{editCard?.id === card.id ? <input type="text" defaultValue={card.cardNumber} /> : card.cardNumber}</td>
              <td>{editCard?.id === card.id ? <input type="text" defaultValue={card.expiryDate} /> : card.expiryDate}</td>
              <td>{editCard?.id === card.id ? <input type="text" defaultValue={card.cvv} /> : card.cvv}</td>
              <td>
                {editCard?.id === card.id ? (
                  <>
                    <button className="save-button"  onClick={() => handleUpdateCard({ ...card, cardName: 'Updated Name', cardNumber: 'Updated Number', expiryDate: 'Updated Expiry', cvv: 'Updated CVV' })}>Save</button>
                    <button className="cancel-button"  onClick={() => setEditCard(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="edit-button" onClick={() => handleEditCard(card)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDeleteCard(card.id)}>Delete</button>
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
