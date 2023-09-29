import React, { useEffect, useState } from "react";

const FeedbackView = () => {
  useEffect(() => handleSearch(), []);
  const [reviews, setReviews] = useState([]);
  function handleSearch() {
    fetch("http://localhost:4042/api/feedback", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setReviews(data);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  return (
    <div class="main">
      <div class="review_container">
        {!reviews.error &&
          reviews.map((review) => (
            <div className="feedback_card">
              <div className="name_wrap">
                <div class="letter">{review.customerName.charAt(0)}</div>
                <div>
                  <div className="customer_name">{review.customerName}</div>
                  <div className="email">{review.email}</div>
                </div>
              </div>
              <div className="rate">{review.rate}</div>
              <div class="comment">{review.recommendation}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeedbackView;
