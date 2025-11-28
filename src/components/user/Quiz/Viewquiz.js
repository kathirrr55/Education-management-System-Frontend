import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAnswerData } from "../../../reducer/answer";
import { getQuizData } from "../../../reducer/quiz";
import UserappBar from "../../Navbar/User";
import { API_BASE_URL } from "../../../config";

export const Viewcategoryquiz = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user.value);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.course) return;

    axios
      .get(`${API_BASE_URL}/getsubquizs`, {
        params: { name: location.state.course },
      })
      .then((response) => {
       console.log("Quiz data received:", response.data);

        setData(response.data);
      })
      .catch((err) => {
        console.error("Error fetching quiz data:", err);
      });
  }, [location.state?.course]);

  const handleAttend = (quizItem) => {
    // Save quiz in Redux
    dispatch(
      getQuizData({
        ...quizItem,
      })
    );

    // Reset answer state
    dispatch(
      getAnswerData({
        q1: "",
        a1: "",
        c1: "",
        q2: "",
        a2: "",
        c2: "",
        q3: "",
        a3: "",
        c3: "",
        q4: "",
        a4: "",
        c4: "",
        q5: "",
        a5: "",
        c5: "",
      })
    );

    // Check attempt count
    axios
      .get(`${API_BASE_URL}/getattemptcount`, {
        params: {
          coursename: quizItem.name, // ✅ Use quizItem, not stale Redux state
          email: user.email,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          let count = res.data[0].count;
          if (count === 3) {
            alert("Max attempts reached!");
          } else {
            navigate("/question");
          }
        } else {
          navigate("/question");
        }
      })
      .catch((err) => {
        console.error("Error checking attempt count:", err);
        alert("Something went wrong. Try again later.");
      });
  };

  return (
    <Box>
      <UserappBar />
      <Container sx={{ mt: 5 }} disableGutters>
        <Box sx={{ margin: "0px 10px 0px 0px", display: "flex", flexWrap: "wrap" }}>
          {data.map((quizItem) => (
            <Card
              key={quizItem._id}
              sx={{
                maxWidth: 245,
                margin: { lg: "10px", md: "10px", xs: "auto" },
                mb: { xs: 5 },
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={quizItem.imageurl}
                  alt={quizItem.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {quizItem.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No of Questions: {quizItem.no_of_questions}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Mark: {quizItem.totalmark}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pass Mark: {quizItem.passmark}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleAttend(quizItem)}>
                  Attend
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
