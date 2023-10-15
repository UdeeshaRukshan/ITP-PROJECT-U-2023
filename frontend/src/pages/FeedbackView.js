import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const FeedbackView = () => {
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState("");
  const [cookies, removeCookie] = useCookies([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  function handleFeedbackSearch() {
    setCurrentPage(1);
    const jsonObject = {
      query: searchQuery,
    };
    fetch("http://localhost:4042/api/feedback/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonObject),
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4042",
        {},
        { withCredentials: true }
      );
      const { user } = data;
      setUsername(user);
    };
    verifyCookie();
    handleSearch();
  }, [cookies, navigate, removeCookie]);

  function handleAddFeedback() {
    navigate("/feedback");
  }

  function handleDelete(id) {
    fetch("http://localhost:4042/api/feedback/delete/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        handleSearch();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
  function handleEdit(id) {
    navigate("/feedback/edit/" + id);
  }

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
      <div class="feedback-search-wrap">
        <input
          type="text"
          placeholder="Search by customer name or email"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleFeedbackSearch}>Search</button>
      </div>
      <div class="add-feedback-wrap">
        <button onClick={handleAddFeedback}>Add New Feedback</button>
      </div>
      <div class="review_container">
        {!reviews.error &&
          reviews
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((review) => (
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
                {review.user === username ? (
                  <div className="btn-right">
                    <button
                      class="feed_delete"
                      onClick={() => handleDelete(review._id)}
                    >
                      Delete
                    </button>
                    <button
                      class="feed_edit"
                      onClick={() => handleEdit(review._id)}
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ))}
      </div>
      <div className="feedback-pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= reviews.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FeedbackView;
