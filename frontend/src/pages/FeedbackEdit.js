import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const FeedbackEdit = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [cookies] = useCookies([]);
  const [alertColor, setAlertColor] = useState("");
  const [showAlert, setShowAlert] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [satisfied, setSatisfied] = useState("");
  const [rate, setRate] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const { id } = useParams();

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
      getReview();
    };

    const getReview = async () => {
      fetch("http://localhost:4042/api/feedback/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            setCustomerName(data.customerName);
            setEmail(data.email);
            setSatisfied(data.satisfied);
            setRate(data.rate);
            setRecommendation(data.recommendation);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };

    verifyCookie();
  }, [cookies.token, id, navigate]);

  const handleSatisfiedChange = (event) => {
    setSatisfied(event.target.value);
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateData()) {
      return;
    }
    const jsonObject = {
      customerName: customerName,
      email: email,
      satisfied: satisfied,
      rate: rate,
      recommendation: recommendation,
      username: username,
    };

    fetch("http://localhost:4042/api/feedback/update/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonObject),
    })
      .then((response) => response.json())
      .then((data) => {
        setAlertColor("success");
        setShowAlert("Feedback Added Successfully");
        navigate("/feedback/all");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  function validateData() {
    const regName = /^[A-Z a-z]+$/;
    const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regRecommendation = /^[A-z a-z 0-9 . , -]+$/;
    setAlertColor("warning");
    if (!customerName) {
      setShowAlert("Enter Customer Name to continue");
      return false;
    }
    if (!regName.test(customerName)) {
      setShowAlert("Invalid Customer Name");
      return false;
    }
    if (!email) {
      setShowAlert("Enter Email Address to continue");
      return false;
    }
    if (!regEmail.test(email)) {
      setShowAlert("Invalid Email Address Name");
      return false;
    }
    console.log(satisfied);
    if (!satisfied) {
      setShowAlert("Enter Satisfaction to continue");
      return false;
    }
    if (!rate) {
      setShowAlert("Enter Rate to continue");
      return false;
    }
    if (!recommendation) {
      setShowAlert("Enter Recommendation to continue");
      return false;
    }
    if (!regRecommendation.test(recommendation)) {
      setShowAlert("Invalid Recommendation");
      return false;
    }
    return true;
  }

  return (
    <div class="main">
      <div className="feedback_container">
        <div class="title">We value your feedback!</div>
        <hr />
        {showAlert ? (
          <div className={"alert alert-" + alertColor + " p-2"} role="alert">
            {showAlert}
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div class="data_set">
            <label for="customerName" class="form-label">
              Customer Name:
            </label>
            <input
              type="text"
              class="form-control"
              id="customerName"
              placeholder="name@example.com"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div class="data_set">
            <label for="email" class="form-label">
              Email address:
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="data_set">
            <label for="exampleFormControlInput1" class="form-label">
              Are you satisfied with the services provided?
            </label>
            <input
              class="form-check-input"
              type="radio"
              value="YES"
              name="satisfied"
              id="satisfied_yes"
              checked={satisfied === "YES"}
              onChange={handleSatisfiedChange}
            />
            <label class="form-check-label" for="satisfied_yes">
              Yes
            </label>
            <input
              class="form-check-input"
              type="radio"
              value="NO"
              name="satisfied"
              id="satisfied_no"
              checked={satisfied === "NO"}
              onChange={handleSatisfiedChange}
            />
            <label class="form-check-label" for="satisfied_no">
              No
            </label>
          </div>
          <div class="data_set">
            <label for="exampleFormControlInput1" class="form-label">
              How would you rate our website:
            </label>
            <div class="check_set">
              <input
                class="form-check-input"
                type="radio"
                value="EXCELLENT"
                name="rate"
                id="rate_excellent"
                checked={rate === "EXCELLENT"}
                onChange={handleRateChange}
              />
              <label class="form-check-label" for="rate_excellent">
                Excellent
              </label>
            </div>
            <div class="check_set">
              <input
                class="form-check-input"
                type="radio"
                value="VERY GOOD"
                name="rate"
                id="rate_very_good"
                checked={rate === "VERY GOOD"}
                onChange={handleRateChange}
              />
              <label class="form-check-label" for="rate_very_good">
                Very Good
              </label>
            </div>
            <div class="check_set">
              <input
                class="form-check-input"
                type="radio"
                value="GOOD"
                name="rate"
                id="rate_good"
                checked={rate === "GOOD"}
                onChange={handleRateChange}
              />
              <label class="form-check-label" for="rate_good">
                Good
              </label>
            </div>
            <div class="check_set">
              <input
                class="form-check-input"
                type="radio"
                value="AVERAGE"
                name="rate"
                id="rate_average"
                checked={rate === "AVERAGE"}
                onChange={handleRateChange}
              />
              <label class="form-check-label" for="rate_average">
                Average
              </label>
            </div>
            <div class="check_set">
              <input
                class="form-check-input"
                type="radio"
                value="POOR"
                name="rate"
                id="rate_poor"
                checked={rate === "POOR"}
                onChange={handleRateChange}
              />
              <label class="form-check-label" for="rate_poor">
                Poor
              </label>
            </div>
          </div>
          <div class="data_set">
            <label for="exampleFormControlInput1" class="form-label">
              Any other suggestions or recommendations for us?
            </label>
            <textarea
              placeholder="Enter your suggestions"
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
            ></textarea>
          </div>
          <div class="data_set">
            <label class="form-check-label" for="flexCheckDefault">
              Your honest answers will give us the opportunity toimprove the
              level of the service provided and iprove your experience.
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackEdit;
