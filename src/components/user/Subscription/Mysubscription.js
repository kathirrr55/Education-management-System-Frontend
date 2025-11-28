import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { useSelector } from "react-redux";
import UserappBar from "../../Navbar/User";
import { useNavigate } from "react-router-dom";

const Mysubscription = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user.value);

  // ✅ useCallback to avoid eslint warnings
  const getData = useCallback(() => {
    axios
      .get(`${API_BASE_URL}/getmysubscription`, {
        params: {
          email: user?.email,
          status: "pending", // 🔹 consider making this dynamic
        },
      })
      .then((response) => {
        setData(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching subscriptions:", error);
      });
  }, [user?.email]);

  useEffect(() => {
    if (user?.email) {
      getData();
    }
  }, [getData, user?.email]);

  return (
    <Box>
      <UserappBar />

      <Container sx={{ mt: 5 }} disableGutters>
        <Box
          sx={{
            margin: "0px 10px 0px 0px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {data.length === 0 ? (
            <Typography variant="h6" sx={{ m: 2 }}>
              No subscriptions found.
            </Typography>
          ) : (
            data.map((item) => (
              <Card
                sx={{
                  maxWidth: 245,
                  margin: { lg: "10px", md: "10px", xs: "auto" },
                  mb: { xs: 5 },
                }}
                key={item._id} // ✅ better key
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ objectFit: "cover" }}
                    height="140"
                    image={item.imageurl}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      ₹ {item.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {item.status}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => window.open(item.videourl, "_blank")} // ✅ opens new tab
                  >
                    Play Video
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      localStorage.setItem("sub_id", item._id);
                      navigate("/Viewcategoryquiz", {
                        state: { course: item.name },
                      });
                    }}
                  >
                    Attend Quiz
                  </Button>
                </CardActions>
              </Card>
            ))
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Mysubscription;
