import React, { useEffect, useState } from "react";
import axios from "axios";

const buttonStyle = {
  padding: "10px 15px",
  marginRight: "10px",
  cursor: "pointer",
  border: "none",
  borderRadius: "5px",
  fontSize: "14px",
};

const saveButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#4caf50", // Changed save button color
  color: "#fff",
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#ddd",
  color: "#363753",
};

const editButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#2196f3", // Changed edit button color
  color: "#fff",
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#f44336",
  color: "#fff",
};

const EditCard = () => {
  // State to manage the card list
  const [cards, setCards] = useState([]);
  const [editCard, setEditCard] = useState(null);

  // Fetch card details from API
  useEffect(() => {
    axios
      .get("http://localhost:4042/payment/getpayments")
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

  // Function to handle updating a card with validations
  const handleUpdateCard = () => {
    // Validate card number length
    if (editCard.cardNumber.replace(/\s/g, "").length !== 16) {
      alert("Card number must be 16 digits");
      return;
    }

    // Validate expiry date format and check if it's not expired
    const currentDate = new Date();
    const [expMonth, expYear] = editCard.expiryDate.split("/");
    const expiryDate = new Date(`20${expYear}`, expMonth - 1);

    if (
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(editCard.expiryDate) ||
      expiryDate < currentDate
    ) {
      alert("Please enter a valid expiry date in MM/YY format");
      return;
    }

    // Validate CVV length
    if (editCard.cvv.length !== 3) {
      alert("CVV must be 3 digits");
      return;
    }

    // Format card number with spaces
    const formattedCardNumber = editCard.cardNumber
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ");

    axios
      .put(`http://localhost:4042/payment/updatepayment/${editCard._id}`, {
        ...editCard,
        cardNumber: formattedCardNumber.trim(),
      })
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

  // Function to handle deleting a card with confirmation
  const handleDeleteCard = (index) => {
    const confirmDelete = window.confirm("Do you want to delete this card?");

    if (confirmDelete) {
      axios
        .delete(
          `http://localhost:4042/payment/deletepayment/${cards[index]._id}`
        )
        .then(() => {
          const updatedCards = cards.filter((_, i) => i !== index);
          setCards(updatedCards);
          setEditCard(null); // Clear the editing state
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <div className="edit-card-container" style={{ marginTop: "15vh" }}>
      <h2 className="edit-card-header">Edit Card Details</h2>
      <table className="edit-card-table">
        <thead
          className="edit-card-thread"
          style={{ backgroundColor: "#363753" }}
        >
          <tr className="tr-edit-card">
            <th className="edit-card-th" style={{ backgroundColor: "#363753" }}>
              ID
            </th>
            <th className="edit-card-th" style={{ backgroundColor: "#363753" }}>
              Card Name
            </th>
            <th className="edit-card-th" style={{ backgroundColor: "#363753" }}>
              Card Number
            </th>
            <th className="edit-card-th" style={{ backgroundColor: "#363753" }}>
              Expiry Date
            </th>
            <th className="edit-card-th" style={{ backgroundColor: "#363753" }}>
              CVV
            </th>
            <th className="edit-card-th" style={{ backgroundColor: "#363753" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody className="edit-card-tbody">
          {cards.map((card, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {editCard && editCard.index === index ? (
                  <input
                    className="edit-card-input"
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
                    className="edit-card-input"
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
                    className="edit-card-input"
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
                    className="edit-card-input"
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
                    <button
                      className="save-button-editcard"
                      onClick={handleUpdateCard}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-button-editcard"
                      onClick={() => setEditCard(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{ backgroundColor: "green" }}
                      className="edit-button-editcard"
                      onClick={() => handleEditCard(index)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ backgroundColor: "red" }}
                      className="delete-button-editcard"
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
