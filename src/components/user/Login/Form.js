// components/user/Login/Form.js

import { Button, Container, Stack, TextField, Typography,Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HomeappBar from "../../Navbar/Home";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserData } from "../../../reducer/user";
import { API_BASE_URL } from "../../../config";

    const Form = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
          alert("Please enter email and password");
          return;
        }

      
        try {
  const res = await axios.post(`${API_BASE_URL}/userlogin`, { email, password });

  console.log("✅ Backend Response:", res.data);

  // ✅ Adjust this condition based on your backend
  if (res.data.status === 200 || res.data.auth === true) {
    // Save token
    localStorage.setItem("token", res.data.token || "dummy_token");

    // Save user data
    const user = res.data.user;
    dispatch(
      getUserData({
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        mobile: user.mobile,
      })
    );

    alert("Login successful!");
    navigate("/userhome"); // ✅ Will redirect now
  } else {
    alert(res.data.message || "Invalid email or password");
  }
} catch (err) {
  console.error("❌ Login error:", err);
  alert("Something went wrong. Please try again later.");

          // ✅ Show proper error message
          if (err.response) {
            alert(`Login failed: ${err.response.data.message}`);
          } else if (err.request) {
            alert("No response from server. Please check your backend.");
          } else {
            alert("Error: " + err.message);
          }
        }
      };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "user/Login/background-2.jpg",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HomeappBar />

      <Container
        maxWidth="sm"
        sx={{
          mt: 10,
          mb: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: "20px",
            width: "100%",
            textAlign: "center",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 8px 30px rgba(0,0,0,0.15)",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.02)" },
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(45deg, #4A00E0, #8E2DE2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
            }}
          >
            User Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.3,
                  mt: 1,
                  borderRadius: "10px",
                  fontSize: "1rem",
                  background:
                    "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #5a67d8 0%, #6b46c1 100%)",
                  },
                  boxShadow: "0px 4px 15px rgba(102, 126, 234, 0.4)",
                }}
              >
                Login
              </Button>

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 2 }}
              >
                OR
              </Typography>

              <Typography variant="body2">
                <Link
                  to="/adminlogin"
                  style={{
                    textDecoration: "none",
                    color: "#5a67d8",
                    fontWeight: 600,
                  }}
                >
                  Click here if you are an Admin?
                </Link>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Form;
