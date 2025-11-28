import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AdminappBar from "../../Navbar/Admin";
import { API_BASE_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { getProductData } from "../../../reducer/product";

const AdminHome = () => {
  const [data, setData] = useState([]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/getallcourses`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching courses:", err))
      .finally(() => setLoading(false));
  };

  const filterData = (courses) => {
    return courses.filter((val) => {
      let priceMatch = true;
      let categoryMatch = true;

      if (price === "20000") priceMatch = val.price < 20000;
      else if (price === "1000") priceMatch = val.price < 1000;
      else if (price === "500-1000") priceMatch = val.price >= 500 && val.price <= 1000;
      else if (price === "100-500") priceMatch = val.price >= 100 && val.price <= 500;

      if (category) categoryMatch = val.category === category;

      return priceMatch && categoryMatch;
    });
  };

  const handleEdit = (item) => {
    dispatch(
      getProductData({
        id: item._id,
        name: item.name,
        imageurl: item.imageurl,
        videourl: item.videourl,
        price: item.price,
        description: item.description,
        category: item.category,
      })
    );
    navigate("/editcourse");
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}deletecourse`, { params: { id } })
      .then((res) => {
        if (res.data.status === 200) fetchData();
      })
      .catch((err) => console.error("Error deleting course:", err));
  };

  return (
    <Box sx={{ background: "linear-gradient(to right, #141e30, #243b55)", minHeight: "100vh" }}>
      <AdminappBar />

      <Container sx={{ pt: 5, pb: 12, position: "relative" }}>
        {/* Sticky Add Course Button */}
        <Button
          variant="contained"
          sx={{
            position: "sticky",
            top: 20,
            float: "right",
            mb: 3,
            background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
            "&:hover": { background: "linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)" },
            zIndex: 1000,
          }}
          onClick={() => navigate("/addcourse")}
        >
          Add Course
        </Button>

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
          Admin Courses Dashboard 🚀
        </Typography>

        {/* Filters */}
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2, mb: 5 }}>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel sx={{ color: "white" }}>Sort By Price</InputLabel>
            <Select
              value={price}
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
                    height: "100%",
                    transition: "0.4s",
                    "&:hover": { transform: "translateY(-8px)", boxShadow: "0 8px 25px rgba(255,255,255,0.15)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={item.imageurl}
                    alt={item.name}
                    sx={{
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                      transition: "0.4s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#90caf9" }}>
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.9,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.description}
                    </Typography>
                    <Typography sx={{ mt: 1, fontWeight: "bold" }}>₹ {item.price}</Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" }, gap: 1, px: 2, pb: 2 }}>
                    <Button
                      fullWidth
                      size="small"
                      color="primary"
                      variant="contained"
                      sx={{
                        background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                        "&:hover": { background: "linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)" },
                      }}
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      fullWidth
                      size="small"
                      color="error"
                      variant="contained"
                      sx={{
                        background: "linear-gradient(90deg, #f44336 0%, #ff7961 100%)",
                        "&:hover": { background: "linear-gradient(90deg, #ff7961 0%, #f44336 100%)" },
                      }}
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
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

export default AdminHome;
