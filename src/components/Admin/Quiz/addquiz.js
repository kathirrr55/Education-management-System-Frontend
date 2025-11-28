// ✅ Imports
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import AdminappBar from "../../Navbar/Admin";

const Addquiz = () => {
  // ✅ State variables
  const [quizname, setquizname] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [description, setdescription] = useState("");
  const [passmark, setpassmark] = useState("");
  const [totalmark, settotalmark] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correct_option: "" },
    { question: "", options: ["", "", "", ""], correct_option: "" },
    { question: "", options: ["", "", "", ""], correct_option: "" },
    { question: "", options: ["", "", "", ""], correct_option: "" },
    { question: "", options: ["", "", "", ""], correct_option: "" },
  ]);

  const navigate = useNavigate();

  // ✅ Handle question or option updates
  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quizname || !imageUrl || !description || !passmark || !totalmark) {
      alert("⚠️ Please fill all quiz details");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question || q.options.some((opt) => !opt) || !q.correct_option) {
        alert(`⚠️ Please fill all fields for Question ${i + 1}`);
        return;
      }
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/addquiz`, {
        name: quizname,
        imageUrl,
        description,
        no_of_questions: questions.length,
        passmark: Number(passmark),
        totalmark: Number(totalmark),
        questions: questions.map((q) => ({
          question: q.question,
          options: q.options,
          correct_option: q.correct_option,
        })),
        createdBy: "Admin",
      });

      if (res.status === 200) {
        alert("✅ Quiz Created Successfully!");
        navigate("/viewquiz");
      } else {
        alert("❌ Failed to create quiz. Please try again.");
      }
    } catch (error) {
      console.error("❌ Server Error:", error);
      alert("❌ Server error while creating quiz. Please check backend.");
    }
  };



  return (
    <>
      <AdminappBar />
      <Container>
        <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
          Create New Quiz
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Quiz Name"
              value={quizname}
              onChange={(e) => setquizname(e.target.value)}
              fullWidth
            />
            <TextField
              label="Image URL"
              value={imageUrl}
              onChange={(e) => setimageUrl(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Pass Mark"
                value={passmark}
                onChange={(e) => setpassmark(e.target.value)}
                fullWidth
              />
              <TextField
                label="Total Mark"
                value={totalmark}
                onChange={(e) => settotalmark(e.target.value)}
                fullWidth
              />
            </Stack>

            {/* ✅ Question Inputs */}
            {questions.map((q, index) => (
              <Box key={index} sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
                <Typography variant="h6">Question {index + 1}</Typography>
                <TextField
                  label="Question"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                {q.options.map((opt, i) => (
                  <TextField
                    key={i}
                    label={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(index, i, e.target.value)}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                ))}
                <TextField
                  label="Correct Option"
                  value={q.correct_option}
                  onChange={(e) => handleQuestionChange(index, "correct_option", e.target.value)}
                  fullWidth
                />
              </Box>
            ))}

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Submit Quiz
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Addquiz;
