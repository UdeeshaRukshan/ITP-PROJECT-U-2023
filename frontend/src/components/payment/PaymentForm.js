import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputMask from "react-input-mask";

export default function PaymentForm() {
  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [expDate, setExpDate] = React.useState("");

  const isCardNumberValid = (cardNumber) => {
    const cardNumberPattern = /^\d{16}$/;
    return cardNumberPattern.test(cardNumber);
  };

  const isCvvValid = (cvv) => {
    const cvvPattern = /^\d{3}$/;
    return cvvPattern.test(cvv);
  };

  const isCardExpired = (expDate) => {
    const currentDate = new Date();
    const [expMonth, expYear] = expDate.split('/').map((val) => parseInt(val));
    if (expMonth >= 1 && expMonth <= 12 && expYear >= 0) {
      const expirationDate = new Date(expYear + 2000, expMonth - 1, 1);
      return expirationDate < currentDate;
    }
    return true; // Invalid date
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Card Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={(e) => setCardName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            error={!isCardNumberValid(cardNumber)}
            helperText={
              !isCardNumberValid(cardNumber)
                ? "Please enter a valid 16-digit card number"
                : ""
            }
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputMask
            mask="99/99"
            maskChar={null}
            onChange={(e) => setExpDate(e.target.value)}
          >
            {() => (
              <TextField
                required
                id="expDate"
                label="Expiry date (MM/YY)"
                fullWidth
                autoComplete="cc-exp"
                variant="standard"
                error={isCardExpired(expDate)}
                helperText={
                  isCardExpired(expDate)
                    ? "Card has already expired"
                    : ""
                }
              />
            )}
          </InputMask>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            error={!isCvvValid(cvv)}
            helperText={
              !isCvvValid(cvv)
                ? "Please enter a valid 3-digit CVV"
                : ""
            }
            onChange={(e) => setCvv(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveCard" value="yes" />
            }
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}


