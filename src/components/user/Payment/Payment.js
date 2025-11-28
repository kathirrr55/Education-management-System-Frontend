import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import Select from "@mui/material/Select";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserappBar from "../../Navbar/User";

const Payment = () => {
  const location = useLocation();
  const [course] = useState(location.state.coursename);
  const [cost] = useState(location.state.cost);
  const [cardno, setCardno] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymethod, setPaymethod] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!cardno || !cvv || !paymethod) return "Please fill all fields";

    if (!/^\d{16}$/.test(cardno)) return "Card number must be 16 digits";
    if (!/^\d{3}$/.test(cvv)) return "CVV must be 3 digits";
    if (!paymethod) return "Please select a payment method";

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSuccess("Subscription Added Successfully.");
    setTimeout(() => {
      navigate("/receipt", {
        state: { coursename: course, cost: cost },
      });
    }, 1500);
  };

  return (
    <Box>
      <UserappBar />
      <Container
        sx={{
          width: { xs: "90%", sm: "60%", md: "40%", lg: "30%" },
          background: "#fff",
          p: 3,
          borderRadius: "10px",
          mt: 4,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack sx={{ mt: 3 }} spacing={3}>
            <Typography variant="h5">PAYMENT FORM</Typography>

            <TextField fullWidth label="Course" value={course} disabled />
            <TextField fullWidth label="Cost" value={cost} disabled />

            <TextField
              fullWidth
              label="Card Number"
              value={cardno}
              onChange={(e) => setCardno(e.target.value)}
              inputProps={{ maxLength: 16 }}
            />
            <TextField
              fullWidth
              label="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              inputProps={{ maxLength: 3 }}
            />

            <FormControl fullWidth>
              <InputLabel id="pay-method-label">Pay Method</InputLabel>
              <Select
                labelId="pay-method-label"
                value={paymethod}
                onChange={(e) => setPaymethod(e.target.value)}
              >
                <MenuItem value="GPay">GPay</MenuItem>
                <MenuItem value="Card">Card</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained">
              PAY NOW
            </Button>
          </Stack>
        </form>
      </Container>

      {/* Snackbar alerts */}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess("")}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Payment;
