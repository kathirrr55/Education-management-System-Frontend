import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // ✅ cleaned
import { getQuizData } from "../../../reducer/quiz";
import { API_BASE_URL } from "../../../config";
import AdminappBar from "../../Navbar/Admin";

export const Viewquiz = props => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(API_BASE_URL + "/getallquizs").then(response => {
      setData(response.data);
    });
  };

  const handleUpdate = quiz => {
    dispatch(
      getQuizData({
        id: quiz._id,
        name: quiz.name,
        imageurl: quiz.imageurl,
        description: quiz.description,
        no_of_questions: quiz.no_of_questions,
        passmark: quiz.passmark,
        totalmark: quiz.totalmark,
        q1: quiz.q1,
        q1_options: quiz.q1_options,
        q1_correct_option: quiz.q1_correct_option,
        q2: quiz.q2,
        q2_options: quiz.q2_options,
        q2_correct_option: quiz.q2_correct_option,
        q3: quiz.q3,
        q3_options: quiz.q3_options,
        q3_correct_option: quiz.q3_correct_option,
        q4: quiz.q4,
        q4_options: quiz.q4_options,
        q4_correct_option: quiz.q4_correct_option,
        q5: quiz.q5,
        q5_options: quiz.q5_options,
        q5_correct_option: quiz.q5_correct_option,
        creationdate: quiz.creationdate,
        createdby: quiz.createdby
      })
    );
    navigate("/editquiz");
  };

  const handleDelete = id => {
    axios
      .delete(API_BASE_URL + "/deletequiz", { params: { id } })
      .then(res => {
        if (res.data.status === 200) {
          getData();
        }
      });
  };

  return (
    <Box>
      <AdminappBar />
      <Container sx={{ mt: 5 }} disableGutters>
        <Button
          variant="contained"
          sx={{
            float: { lg: "right", md: "none", sm: "none", xs: "none" },
            mb: 3
          }}
          onClick={() => navigate("/addquiz")}
        >
          Add Quiz
        </Button>

        <Box sx={{ margin: "0px 10px 0px 0px", display: "flex", flexWrap: "wrap" }}>
          {data.map(quiz => (
            <Card
              key={quiz._id}
              sx={{
                maxWidth: 245,
                margin: { lg: "10px", md: "10px", xs: "auto" },
                mb: { xs: 5 }
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={quiz.imageurl}
                  alt={quiz.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {quiz.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No. of Questions: {quiz.no_of_questions}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Marks: {quiz.totalmark}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pass Marks: {quiz.passmark}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleUpdate(quiz)}>
                  Update
                </Button>
                <Button size="small" color="error" onClick={() => handleDelete(quiz._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

