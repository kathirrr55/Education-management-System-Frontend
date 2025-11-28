import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
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
import { useSelector } from "react-redux";
import AdminappBar from "../../Navbar/Admin";
import { API_BASE_URL } from "../../../config";

const Editcourse = () => {
  const product = useSelector((state) => state.product.value);

  const [coursename, setCoursename] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [imageurl, setImageurl] = useState(product.imageurl);
  const [videourl, setVideourl] = useState(product.videourl);
  const [category, setCategory] = useState(product.category);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coursename || !price || !description || !imageurl || !videourl || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.put(`${API_BASE_URL}editcourse`, {
        id: product.id,
        coursename,
        price,
        description,
        imageurl,
        videourl,
        category,
      });

      if (res.data.status === 200) {
        alert(res.data.message);
        navigate("/adminhome");
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        pt: 4,
        pb: 6,
      }}
    >
      <AdminappBar />

      <Container
        sx={{
          maxWidth: { xs: "95%", sm: "70%", md: "45%" },
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(15px)",
          p: 4,
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
          mt: 6,
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{
              color: "#ffffff",
              fontWeight: "bold",
              letterSpacing: 1,
              textShadow: "0 0 10px rgba(255,255,255,0.3)",
            }}
          >
            Edit Course ✏️
          </Typography>

          <TextField
            fullWidth
            label="Course Name"
            value={coursename}
            onChange={(e) => setCoursename(e.target.value)}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            sx={{ input: { color: "#fff" } }}
          />

          <TextField
            fullWidth
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            sx={{ input: { color: "#fff" } }}
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            sx={{ input: { color: "#fff" } }}
          />

          <TextField
            fullWidth
            label="Image URL"
            value={imageurl}
            onChange={(e) => setImageurl(e.target.value)}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            sx={{ input: { color: "#fff" } }}
          />

          <TextField
            fullWidth
            label="Video URL"
            value={videourl}
            onChange={(e) => setVideourl(e.target.value)}
            InputLabelProps={{ style: { color: "#ffffff" } }}
            sx={{ input: { color: "#fff" } }}
          />

          <FormControl fullWidth size="small">
            <InputLabel sx={{ color: "#ffffff" }}>Choose Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{
                color: "#fff",
                ".MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.5)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#90caf9" },
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

          <Button
            variant="contained"
            fullWidth
            sx={{
              background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { background: "linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)" },
            }}
            onClick={handleSubmit}
          >
            Update
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Editcourse;



// import { Button, Container, Stack, TextField, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../../../config";
// import AdminappBar from "../../Navbar/Admin";
// import { useSelector } from "react-redux";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";

// const Editcourse = () => {
//   const product = useSelector(state => state.product.value);
//   const [coursename, setcoursename] = useState(product.name);
//   const [price, setprice] = useState(product.price);
//   const [description, setdescription] = useState(product.description);
//   const [imageurl, setimageurl] = useState(product.imageurl);
//   const [videourl, setvideourl] = useState(product.videourl);
//   const [category, setcategory] = useState(product.category);
//   const navigate = useNavigate();
//   const handleSubmit = e => {
//     e.preventDefault();
//     if (
//       coursename === "" ||
//       price === "" ||
//       description === "" ||
//       imageurl === "" ||
//       videourl === ""
//     ) {
//       alert("please fill all fields");
//     } else {
//       axios
//         .put(API_BASE_URL + "editcourse", {
//           id: product.id,
//           coursename: coursename,
//           price: price,
//           description: description,
//           imageurl: imageurl,
//           videourl: videourl,
//           category: category
//         })
//         .then(res => {
//           console.log(res.data);
//           if (res.data.status === 200) {
//             alert(res.data.message);
//             navigate("/adminhome");
//           }
//         });
//     }
//   };
//   return (
//     <Box>
//       <AdminappBar />
//       <Container
//         sx={{
//           width: "30%",
//           background: "#fff",
//           p: 3,
//           borderRadius: "10px",
//           mt: 4
//         }}
//       >
//         <Stack sx={{ mt: 5 }} spacing={4}>
//           <Typography variant="h5">EDIT COURSE</Typography>

//           <TextField
//             fullWidth
//             label="coursename"
//             id="fullWidth"
//             value={coursename}
//             onChange={e => setcoursename(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Price"
//             id="fullWidth"
//             value={price}
//             onChange={e => setprice(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             id="fullWidth"
//             value={description}
//             onChange={e => setdescription(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Image Url"
//             id="fullWidth"
//             value={imageurl}
//             onChange={e => setimageurl(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Video Url"
//             id="fullWidth"
//             value={videourl}
//             onChange={e => setvideourl(e.target.value)}
//           />
//           <FormControl sx={{ m: 1, width: "100%" }} size="small">
//             <InputLabel id="demo-select-small-label">
//               Choose Category
//             </InputLabel>
//             <Select
//               labelId="demo-select-small-label"
//               id="demo-select-small"
//               value={category}
//               label="Filter"
//               onChange={e => setcategory(e.target.value)}
//             >
//               <MenuItem value="">
//                 <em>None</em>
//               </MenuItem>
//               <MenuItem value="Designing">Designing</MenuItem>
//               <MenuItem value="Marketing">Marketing</MenuItem>
//               <MenuItem value="Development">Development</MenuItem>
//             </Select>
//           </FormControl>

//           <Button variant="contained" onClick={handleSubmit}>
//             Update
//           </Button>
//         </Stack>
//       </Container>
//     </Box>
//   );
// };

// export default Editcourse;
