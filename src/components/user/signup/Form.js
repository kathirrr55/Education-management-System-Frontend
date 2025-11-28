import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Paper,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeappBar from "../../Navbar/Home";
import axios from "axios";
import { API_BASE_URL } from "../../../config";

const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    mobile: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, email, password, address, mobile } = formData;
    if (!username || !email || !password || !address || !mobile) {
      return "Please fill all fields";
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    if (mobile.length !== 10 || isNaN(mobile)) {
      return "Mobile must be 10 digits";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/createaccount`, formData);
      if (res.data.status === 200) {
        setSuccess("Account Created Successfully");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(res.data.message || "Failed to create account");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // ✅ background gradient
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <HomeappBar />

      <Container
        component={Paper}
        elevation={6}
        sx={{
          width: { xs: "90%", sm: "70%", md: "45%", lg: "30%" },
          p: 4,
          mt: 6,
          borderRadius: "20px",
          backgroundColor: "rgba(255,255,255,0.9)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          backdropFilter: "blur(8px)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 35px rgba(0,0,0,0.3)",
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                letterSpacing: "0.8px",
              }}
            >
              CREATE ACCOUNT
            </Typography>

            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              variant="outlined"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.2,
                mt: 1,
                fontWeight: "bold",
                letterSpacing: "0.5px",
                borderRadius: "10px",
                background:
                  "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #5a67d8 0%, #6b46c1 100%)",
                },
                boxShadow: "0px 4px 15px rgba(102, 126, 234, 0.4)",
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </form>
      </Container>

      {/* ✅ Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

      {/* ✅ Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default Form;
