import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeappBar from "../../Navbar/Home";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    if (email === "admin@gmail.com" && password === "admin") {
      navigate("/adminhome");
    } else {
      alert("Invalid email or password");
    }
  };
return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #2196f3 0%, #21cbf3 50%, #6dd5fa 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <HomeappBar />

      <Container
        sx={{
          width: { xs: "90%", sm: "70%", md: "40%", lg: "30%" },
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          p: 4,
          mt: 10,
          backdropFilter: "blur(10px)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
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
                mb: 2,
                letterSpacing: "1px",
              }}
            >
              ADMIN LOGIN
            </Typography>

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                py: 1.2,
                mt: 1,
                fontWeight: "bold",
                letterSpacing: "0.5px",
                borderRadius: "10px",
                background:
                  "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)",
                },
              }}
            >
              Login
            </Button>

            <Typography
              textAlign="center"
              variant="body2"
              sx={{ mt: 2, color: "text.secondary" }}
            >
              For security reasons, only authorized admins can access this
              panel.
            </Typography>
          </Stack>
        </form>
      </Container>
    </Box>
  );
};

export default Form;