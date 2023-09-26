import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel"; 

const products = [
  {
    name: "Product 1",
    desc: "A nice thing",
    price: "$9.99",
  },
  {
    name: "Product 2",
    desc: "Another thing",
    price: "$3.45",
  },
  {
    name: "Product 3",
    desc: "Something else",
    price: "$6.51",
  },
  {
    name: "Product 4",
    desc: "Best thing of all",
    price: "$14.11",
  },
];

const payments = [
  { name: "Card Type", detail: "Visa" },
  { name: "Card Holder", detail: "Mr John Smith" },
  { name: "Card Number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry Date", detail: "03/04/2024" },
];

export default function Review() {
  const [agreeTerms, setAgreeTerms] = React.useState(false);

  const handleAgreeChange = (event) => {
    setAgreeTerms(event.target.checked);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Transaction Summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6} style={{ whiteSpace: 'nowrap' }}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <FormControlLabel
          control={<Checkbox color="secondary" name="saveCard" value="yes" />}
          label="I have read and agree to the website terms and conditions"
        />
      </Grid>
    </React.Fragment>
  );
}

