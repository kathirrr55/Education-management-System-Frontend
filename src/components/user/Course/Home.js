import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserappBar from "../../Navbar/User";
import { API_BASE_URL } from "../../../config";

import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Grid,
} from "@mui/material";

const Home = () => {
  const [data, setData] = useState([]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  // ✅ Fetch all courses
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get(`${API_BASE_URL}/getallcourses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setData(response.data))
      .catch((err) => {
        console.error("Error fetching courses:", err);
        alert("Failed to load courses. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // ✅ Filter logic
  const filterData = (courses) => {
    return courses.filter((val) => {
      let priceMatch = true;
      let categoryMatch = true;

      if (price === "100-500") priceMatch = val.price >= 100 && val.price <= 500;
      else if (price === "500-1000") priceMatch = val.price >= 500 && val.price <= 1000;
      else if (price === "1000") priceMatch = val.price < 1000;
      else if (price === "20000") priceMatch = val.price < 20000;

      if (category) categoryMatch = val.category === category;
      return priceMatch && categoryMatch;
    });
  };

  // ✅ Subscribe handler
  const handleSubscribe = (item) => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_BASE_URL}/getattemptcount`, {
        params: { coursename: item.name, email: user.email },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.length > 0) {
          alert("You have already subscribed to this course!");
        } else {
          axios
            .post(
              `${API_BASE_URL}/addsubscription`,
              {
                name: item.name,
                price: item.price,
                description: item.description,
                imageurl: item.imageurl,
                videourl: item.videourl,
                category: item.category,
                email: user.email,
                percentage: "0",
                status: "pending",
              },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
              if (res.data.status === 200) {
                navigate("/payment", {
                  state: { coursename: item.name, cost: item.price },
                });
              }
            })
            .catch((err) => {
              console.error("Error adding subscription:", err);
              alert("Failed to subscribe. Try again.");
            });
        }
      })
      .catch((err) => {
        console.error("Error checking subscription:", err);
        alert("Error checking subscription. Try again.");
      });
  };

  // ✅ Render
  return (
    <Box sx={{ background: "linear-gradient(to right, #141e30, #243b55)", minHeight: "100vh" }}>
      <UserappBar />
      <Container sx={{ pt: 5, pb: 10 }}>
        {/* Header */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "white",
            fontWeight: "bold",
            mb: 3,
            letterSpacing: 1,
            textShadow: "0 0 10px rgba(255,255,255,0.3)",
          }}
        >
          Explore Our Courses 🚀
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            mb: 5,
          }}
        >
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel sx={{ color: "white" }}>Sort By Price</InputLabel>
            <Select
              value={price}
              label="Sort By Price"
              onChange={(e) => setPrice(e.target.value)}
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.4)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#90caf9" },
                "& .MuiSvgIcon-root": { color: "white" },
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="20000">Under 20000</MenuItem>
              <MenuItem value="1000">Under 1000</MenuItem>
              <MenuItem value="500-1000">Between 500 to 1000</MenuItem>
              <MenuItem value="100-500">Between 100 to 500</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel sx={{ color: "white" }}>Sort By Category</InputLabel>
            <Select
              value={category}
              label="Sort By Category"
              onChange={(e) => setCategory(e.target.value)}
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.4)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#90caf9" },
                "& .MuiSvgIcon-root": { color: "white" },
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Development">Development</MenuItem>
              <MenuItem value="Designing">Designing</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Loading or No Data */}
        {loading ? (
          <Typography align="center" color="white">
            Loading courses...
          </Typography>
        ) : filterData(data).length === 0 ? (
          <Typography align="center" color="white">
            No courses found 😕
          </Typography>
        ) : (
                  <Grid container spacing={3} justifyContent="center">
          {filterData(data).map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  backdropFilter: "blur(12px)",
                  background: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "20px",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%", // ✅ Full height for flex layout
                  transition: "0.4s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 25px rgba(255, 255, 255, 0.15)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={item.imageurl}
                  alt={item.name}
                  sx={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
                />
                <CardContent sx={{ flexGrow: 1 }}> {/* ✅ flexGrow makes all content areas expand equally */}
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#90caf9" }}>
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.9,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 5, // ✅ limits description to 5 lines
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Typography sx={{ mt: 1, fontWeight: "bold" }}>₹ {item.price}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      background: "linear-gradient(to right, #2196f3, #21cbf3)",
                      borderRadius: "25px",
                      textTransform: "none",
                      fontWeight: "bold",
                      mb: 1,
                      "&:hover": { background: "linear-gradient(to right, #1976d2, #00bcd4)" },
                    }}
                    onClick={() => handleSubscribe(item)}
                  >
                    Subscribe
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        )}
      </Container>
    </Box>
  );
};

export default Home;
