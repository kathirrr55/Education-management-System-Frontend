import React, { useState } from "react";
import {
  Box,
  Stack,
  Container,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import { storage } from "../../../files/firebase";
import { API_BASE_URL } from "../../../config";
import AdminappBar from "../../Navbar/Admin";

const MotionContainer = motion(Container);
const MotionBox = motion(Box);


const Addcourse = () => {
  const [coursename, setCoursename] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [videourl, setVideourl] = useState(null);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coursename || !price || !description || !imageurl || !videourl || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      const currentDate = new Date();
      const fulldate = `${currentDate.getDate()}-0${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

      const uploadTask = storage.ref(`videos/${fulldate}.mp4`).put(videourl);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Upload error:", error);
        },
        async () => {
          const videoURL = await storage.ref(`videos/${fulldate}.mp4`).getDownloadURL();

          const res = await axios.post(`${API_BASE_URL}addcourse`, {
            name: coursename,
            price,
            description,
            imageurl,
            videourl: videoURL,
            category,
          });

          if (res.data.status === 200) {
            alert(res.data.message);
            navigate("/adminhome");
          }
        }
      );
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #141E30, #243B55)",
        pt: 4,
        pb: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AdminappBar />

      <MotionContainer
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        sx={{
          maxWidth: { xs: "95%", sm: "70%", md: "45%" },
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(20px)",
          borderRadius: "20px",
          p: 5,
          mt: 6,
          boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              letterSpacing: 1,
              textShadow: "0 0 15px rgba(255,255,255,0.5)",
            }}
          >
            🎓 Add New Course
          </Typography>

          {/* Animated Input Fields */}
          {[ 
            { label: "Course Name", value: coursename, set: setCoursename },
            { label: "Price", type: "number", value: price, set: setPrice },
            { label: "Description", multiline: true, minRows: 3, value: description, set: setDescription },
            { label: "Image URL", value: imageurl, set: setImageurl },
          ].map((field, i) => (
            <MotionBox
              key={i}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <TextField
                fullWidth
                {...field}
                label={field.label}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                InputLabelProps={{ style: { color: "#ffffffb3" } }}
                sx={{
                  input: { color: "#fff" },
                  textarea: { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                    "&:hover fieldset": { borderColor: "#00c6ff" },
                    "&.Mui-focused fieldset": { borderColor: "#00c6ff" },
                  },
                }}
              />
            </MotionBox>
          ))}

          {/* File Input */}
          <MotionBox whileHover={{ scale: 1.02 }}>
            <TextField
              type="file"
              fullWidth
              onChange={(e) => setVideourl(e.target.files[0])}
              InputLabelProps={{ style: { color: "#ffffffb3" } }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                  "&:hover fieldset": { borderColor: "#00c6ff" },
                },
              }}
            />
          </MotionBox>

          {/* Category Select */}
          <MotionBox whileHover={{ scale: 1.02 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: "#ffffffb3" }}>Choose Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  color: "#fff",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.4)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00c6ff",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00c6ff",
                  },
                  "& .MuiSvgIcon-root": { color: "#fff" },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Designing">Designing</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Development">Development</MenuItem>
              </Select>
            </FormControl>
          </MotionBox>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                background:
                  "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
                py: 1.2,
                borderRadius: "12px",
                boxShadow: "0 6px 20px rgba(0, 198, 255, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #0072ff 0%, #00c6ff 100%)",
                  boxShadow: "0 8px 25px rgba(0, 198, 255, 0.6)",
                },
              }}
              onClick={handleSubmit}
            >
              💾 Save Course
            </Button>
          </motion.div>
        </Stack>
      </MotionContainer>
    </Box>
  );
};

export default Addcourse;
