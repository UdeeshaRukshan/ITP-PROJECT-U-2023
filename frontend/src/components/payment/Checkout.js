import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import UserInfo from "./UserInfo";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

import { useState } from "react";
import axios from "axios";

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  const [reviewInfo, setReviewInfo] = useState({});

  const handleUserInfoSubmit = (data) => {
    setUserInfo(data);
    handleNext();
  };

  const handlePaymentInfoSubmit = (data) => {
    setPaymentInfo(data);
    handleNext();
  };

  const handleReviewInfoSubmit = (data) => {
    setReviewInfo(data);
    handleNext();
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePayNow = () => {
    // Combine all the collected data
    const allData = {
      userInfo,
      paymentInfo,
      reviewInfo,
    };

    // Send the data to your server or perform other actions as needed
    console.log("All Data:", allData);
    axios
      .post("http://localhost:8070/payment/addpayment", allData)
      .then((response) => {
        // Handle success, e.g., show a success message, redirect, etc.
        console.log("Data submitted successfully:", response.data);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error submitting data:", error);
      });

    // Reset the form or redirect to a thank-you page
  };

  const steps = ["User Info", "Payment Info", "Review "];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <UserInfo onUserInfoSubmit={handleUserInfoSubmit} />;
      case 1:
        return <PaymentForm onPaymentInfoSubmit={handlePaymentInfoSubmit} />;
      case 2:
        return <Review onReviewInfoSubmit={handleReviewInfoSubmit} />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            AuctionPal
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank You For Your Transaction.
              </Typography>
              <Typography variant="subtitle1">
                Your item is now ready for pickup. Your winning bid number is
                #2001539. We have emailed your confirmation, and you can come to
                our location to collect your item. Please check your email for
                more details on how to claim your item. Thank you for
                participating!
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 1 ? handlePayNow : handleNext
                  }
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Pay Now" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default Checkout;
