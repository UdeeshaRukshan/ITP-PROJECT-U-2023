import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
    const navigate = useNavigate();

    const [alertColor, setAlertColor] = useState("");
    const [showAlert, setShowAlert] = useState("");

    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [satisfied, setSatisfied] = useState("");
    const [rate, setRate] = useState("");
    const [recommendation, setRecommendation] = useState("");

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
        };

        fetch("http://localhost:4040/api/feedback/create", {
            method: "POST", headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonObject)
        })
            .then((response) => response.json())
            .then((data) => {
                setAlertColor("success");
                setShowAlert("Feedback Added Successfully");
                navigate("/feedback/all");
            })
            .catch((error) => {
                console.log("Error:", error);
            })

    }

    function validateData() {

        const regName = /^[A-Z a-z]+$/;
        const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regRecommendation = /^[A-z a-z 0-9 . , -]+$/;
        setAlertColor('warning');
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
                {showAlert ?
                    <div className={"alert alert-" + alertColor + " p-2"} role="alert">
                        {showAlert}
                    </div> : null}
                <form onSubmit={handleSubmit}>

                    <div class="data_set">
                        <label for="customerName" class="form-label">Customer Name:</label>
                        <input type="text" class="form-control" id="customerName" placeholder="name@example.com" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                    </div>
                    <div class="data_set">
                        <label for="email" class="form-label">Email address:</label>
                        <input type="email" class="form-control" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div class="data_set">
                        <label for="exampleFormControlInput1" class="form-label">Are you satisfied with the services provided?</label>
                        <input class="form-check-input" type="radio" value="YES" name="satisfied" id="satisfied_yes" onChange={handleSatisfiedChange} />
                        <label class="form-check-label" for="satisfied_yes">
                            Yes
                        </label>
                        <input class="form-check-input" type="radio" value="NO" name="satisfied" id="satisfied_no" onChange={handleSatisfiedChange} />
                        <label class="form-check-label" for="satisfied_no">
                            No
                        </label>
                    </div>
                    <div class="data_set">
                        <label for="exampleFormControlInput1" class="form-label">How would you rate our website:</label>
                        <div class="check_set">
                            <input class="form-check-input" type="radio" value="EXCELLENT" name="rate" id="rate_excellent" onChange={handleRateChange} />
                            <label class="form-check-label" for="rate_excellent">
                                Excellent
                            </label>
                        </div>
                        <div class="check_set">
                            <input class="form-check-input" type="radio" value="VERY GOOD" name="rate" id="rate_very_good" onChange={handleRateChange} />
                            <label class="form-check-label" for="rate_very_good">
                                Very Good
                            </label>
                        </div>
                        <div class="check_set">
                            <input class="form-check-input" type="radio" value="GOOD" name="rate" id="rate_good" onChange={handleRateChange} />
                            <label class="form-check-label" for="rate_good">
                                Good
                            </label>
                        </div>
                        <div class="check_set">
                            <input class="form-check-input" type="radio" value="AVERAGE" name="rate" id="rate_average" onChange={handleRateChange} />
                            <label class="form-check-label" for="rate_average">
                                Average
                            </label>
                        </div>
                        <div class="check_set">
                            <input class="form-check-input" type="radio" value="POOR" name="rate" id="rate_poor" onChange={handleRateChange} />
                            <label class="form-check-label" for="rate_poor">
                                Poor
                            </label>
                        </div>
                    </div>
                    <div class="data_set">
                        <label for="exampleFormControlInput1" class="form-label">Any other suggestions or recommendations for us?</label>
                        <textarea placeholder="Enter your suggestions" onChange={(e) => setRecommendation(e.target.value)}></textarea>
                    </div>
                    <div class="data_set">
                        <label class="form-check-label" for="flexCheckDefault">
                            Your honest answers will give us the opportunity toimprove the level of the service provided and iprove your experience.
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form >
            </div >
        </div >
    );
};

export default Feedback;
