import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import AdminappBar from "../../Navbar/Admin";
import { API_BASE_URL } from "../../../config";

const Updatequiz = () => {
  let today = new Date().toISOString().slice(0, 10);
  const user = useSelector(state => state.user.value);
  const quiz = useSelector(state => state.quiz.value);

  // Single state for questions (5 by default)
  const [questions, setQuestions] = useState([
    { q: quiz?.q1 || "", options: quiz?.q1_options || "", correct: quiz?.q1_correct_option || "" },
    { q: quiz?.q2 || "", options: quiz?.q2_options || "", correct: quiz?.q2_correct_option || "" },
    { q: quiz?.q3 || "", options: quiz?.q3_options || "", correct: quiz?.q3_correct_option || "" },
    { q: quiz?.q4 || "", options: quiz?.q4_options || "", correct: quiz?.q4_correct_option || "" },
    { q: quiz?.q5 || "", options: quiz?.q5_options || "", correct: quiz?.q5_correct_option || "" }
  ]);

  const [quizname, setquizname] = useState(quiz?.name || "");
  const [imageurl, setimageurl] = useState(quiz?.imageurl || "");
  const [description, setdescription] = useState(quiz?.description || "");
  const [no_of_questions] = useState(quiz?.no_of_questions || "5"); // read-only, no setter
  const [passmark, setpassmark] = useState(quiz?.passmark || "");
  const [totalmark, settotalmark] = useState(quiz?.totalmark || "");

  const navigate = useNavigate();

  // Handle change for dynamic questions
  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Validation
    if (
      !quizname ||
      !imageurl ||
      !description ||
      !no_of_questions ||
      !passmark ||
      !totalmark ||
      questions.some(q => !q.q || !q.options || !q.correct)
    ) {
      alert("Please fill all fields");
      return;
    }

    axios
      .put(API_BASE_URL + "/editquiz", {
        id: quiz?.id,
        name: quizname,
        imageurl,
        description,
        no_of_questions,
        passmark,
        totalmark,
        q1: questions[0].q,
        q1_options: questions[0].options,
        q1_correct_option: questions[0].correct,
        q2: questions[1].q,
        q2_options: questions[1].options,
        q2_correct_option: questions[1].correct,
        q3: questions[2].q,
        q3_options: questions[2].options,
        q3_correct_option: questions[2].correct,
        q4: questions[3].q,
        q4_options: questions[3].options,
        q4_correct_option: questions[3].correct,
        q5: questions[4].q,
        q5_options: questions[4].options,
        q5_correct_option: questions[4].correct,
        updateddate: today,
        createdby: user?.email || "admin"
      })
      .then(res => {
        console.log(res.data);
        if (res.data.status === 200) {
          alert(res.data.message || "Quiz updated successfully");
          navigate("/viewquiz");
        }
      });
  };

  return (
    <Box>
      <AdminappBar />
      <br />
      <br />
      <Container
        sx={{
          width: "30%",
          background: "#fff",
          mt: 3,
          paddingInline: "20px",
          paddingBlock: "20px",
          borderRadius: "10px"
        }}
      >
        <Stack sx={{ mt: 2 }} spacing={4}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            EDIT QUIZ
          </Typography>

          <TextField
            fullWidth
            label="Quiz Name"
            value={quizname}
            onChange={e => setquizname(e.target.value)}
          />
          <TextField
            fullWidth
            label="Image Url"
            value={imageurl}
            onChange={e => setimageurl(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={e => setdescription(e.target.value)}
          />
          <TextField
            fullWidth
            label="Pass Mark"
            value={passmark}
            onChange={e => setpassmark(e.target.value)}
          />
          <TextField
            fullWidth
            label="Total Mark"
            value={totalmark}
            onChange={e => settotalmark(e.target.value)}
          />

          {/* Dynamic Question Fields */}
          {questions.map((q, index) => (
            <Box key={index}>
              <TextField
                fullWidth
                label={`Question ${index + 1}`}
                value={q.q}
                onChange={e => handleQuestionChange(index, "q", e.target.value)}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label={`Question ${index + 1} Options (comma separated)`}
                value={q.options}
                onChange={e => handleQuestionChange(index, "options", e.target.value)}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label={`Question ${index + 1} Correct Option`}
                value={q.correct}
                onChange={e => handleQuestionChange(index, "correct", e.target.value)}
                sx={{ mb: 2 }}
              />
            </Box>
          ))}

          <Button variant="contained" onClick={handleSubmit}>
            Update
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Updatequiz;



// import { Button, Container, Stack, TextField, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import AdminappBar from "../../Navbar/Admin";
// import { API_BASE_URL } from "../../../config";

// const Updatequiz = () => {
//   let today = new Date().toISOString().slice(0, 10);
//   const user = useSelector(state => state.user.value);
//   const quiz = useSelector(state => state.quiz.value);

//   // Single state for questions
//   const [questions, setQuestions] = useState([
//     { q: quiz?.q1 || "", options: quiz?.q1_options || "", correct: quiz?.q1_correct_option || "" },
//     { q: quiz?.q2 || "", options: quiz?.q2_options || "", correct: quiz?.q2_correct_option || "" },
//     { q: quiz?.q3 || "", options: quiz?.q3_options || "", correct: quiz?.q3_correct_option || "" },
//     { q: quiz?.q4 || "", options: quiz?.q4_options || "", correct: quiz?.q4_correct_option || "" },
//     { q: quiz?.q5 || "", options: quiz?.q5_options || "", correct: quiz?.q5_correct_option || "" }
//   ]);

//   const [quizname, setquizname] = useState(quiz?.name || "");
//   const [imageurl, setimageurl] = useState(quiz?.imageurl || "");
//   const [description, setdescription] = useState(quiz?.description || "");
//   const [no_of_questions, setno_of_questions] = useState(quiz?.no_of_questions || "5");
//   const [passmark, setpassmark] = useState(quiz?.passmark || "");
//   const [totalmark, settotalmark] = useState(quiz?.totalmark || "");

//   const navigate = useNavigate();

//   // Handle change for dynamic questions
//   const handleQuestionChange = (index, field, value) => {
//     const updated = [...questions];
//     updated[index][field] = value;
//     setQuestions(updated);
//   };

//   const handleSubmit = e => {
//     e.preventDefault();

//     // Validation
//     if (
//       !quizname ||
//       !imageurl ||
//       !description ||
//       !no_of_questions ||
//       !passmark ||
//       !totalmark ||
//       questions.some(q => !q.q || !q.options || !q.correct)
//     ) {
//       alert("Please fill all fields");
//       return;
//     }

//     axios
//       .put(API_BASE_URL + "editquiz", {
//         id: quiz?.id,
//         name: quizname,
//         imageurl,
//         description,
//         no_of_questions,
//         passmark,
//         totalmark,
//         q1: questions[0].q,
//         q1_options: questions[0].options,
//         q1_correct_option: questions[0].correct,
//         q2: questions[1].q,
//         q2_options: questions[1].options,
//         q2_correct_option: questions[1].correct,
//         q3: questions[2].q,
//         q3_options: questions[2].options,
//         q3_correct_option: questions[2].correct,
//         q4: questions[3].q,
//         q4_options: questions[3].options,
//         q4_correct_option: questions[3].correct,
//         q5: questions[4].q,
//         q5_options: questions[4].options,
//         q5_correct_option: questions[4].correct,
//         updateddate: today,
//         createdby: user?.email || "admin"
//       })
//       .then(res => {
//         console.log(res.data);
//         if (res.data.status === 200) {
//           alert(res.data.message || "Quiz updated successfully");
//           navigate("/viewquiz");
//         }
//       });
//   };

//   return (
//     <Box>
//       <AdminappBar />
//       <br />
//       <br />
//       <Container
//         sx={{
//           width: "30%",
//           background: "#fff",
//           mt: 3,
//           paddingInline: "20px",
//           paddingBlock: "20px",
//           borderRadius: "10px"
//         }}
//       >
//         <Stack sx={{ mt: 2 }} spacing={4}>
//           <Typography variant="h5" sx={{ textAlign: "center" }}>
//             EDIT QUIZ
//           </Typography>

//           <TextField
//             fullWidth
//             label="Quiz Name"
//             value={quizname}
//             onChange={e => setquizname(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Image Url"
//             value={imageurl}
//             onChange={e => setimageurl(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             value={description}
//             onChange={e => setdescription(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Pass Mark"
//             value={passmark}
//             onChange={e => setpassmark(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Total Mark"
//             value={totalmark}
//             onChange={e => settotalmark(e.target.value)}
//           />

//           {/* Dynamic Question Fields */}
//           {questions.map((q, index) => (
//             <Box key={index}>
//               <TextField
//                 fullWidth
//                 label={`Question ${index + 1}`}
//                 value={q.q}
//                 onChange={e => handleQuestionChange(index, "q", e.target.value)}
//                 sx={{ mb: 1 }}
//               />
//               <TextField
//                 fullWidth
//                 label={`Question ${index + 1} Options (comma separated)`}
//                 value={q.options}
//                 onChange={e => handleQuestionChange(index, "options", e.target.value)}
//                 sx={{ mb: 1 }}
//               />
//               <TextField
//                 fullWidth
//                 label={`Question ${index + 1} Correct Option`}
//                 value={q.correct}
//                 onChange={e => handleQuestionChange(index, "correct", e.target.value)}
//                 sx={{ mb: 2 }}
//               />
//             </Box>
//           ))}

//           <Button variant="contained" onClick={handleSubmit}>
//             Update
//           </Button>
//         </Stack>
//       </Container>
//     </Box>
//   );
// };

// export default Updatequiz;


// // import { Button, Container, Stack, TextField, Typography } from "@mui/material";
// // import { Box } from "@mui/system";
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { useSelector } from "react-redux";
// // import AdminappBar from "../../Navbar/Admin";
// // import { API_BASE_URL } from "../../../config";

// // const Updatequiz = () => {
// //   let today = new Date().toISOString().slice(0, 10);
// //   const user = useSelector(state => state.user.value);
// //   const quiz = useSelector(state => state.quiz.value);
// //   const [quizname, setquizname] = useState(quiz.name);
// //   const [imageurl, setimageurl] = useState(quiz.imageurl);
// //   const [description, setdescription] = useState(quiz.description);
// //   const [no_of_questions, setno_of_questions] = useState(quiz.no_of_questions);
// //   const [passmark, setpassmark] = useState(quiz.passmark);
// //   const [totalmark, settotalmark] = useState(quiz.totalmark);
// //   const [question1, setquestion1] = useState(quiz.q1);
// //   const [question1options, setquestion1options] = useState(quiz.q1_options);
// //   const [question1correctoption, setquestion1correctoption] = useState(
// //     quiz.q1_correct_option
// //   );
// //   const [question2, setquestion2] = useState(quiz.q2);
// //   const [question2options, setquestion2options] = useState(quiz.q2_options);
// //   const [question2correctoption, setquestion2correctoption] = useState(
// //     quiz.q2_correct_option
// //   );

// //   const [question3, setquestion3] = useState(quiz.q3);
// //   const [question3options, setquestion3options] = useState(quiz.q3_options);
// //   const [question3correctoption, setquestion3correctoption] = useState(
// //     quiz.q3_correct_option
// //   );

// //   const [question4, setquestion4] = useState(quiz.q4);
// //   const [question4options, setquestion4options] = useState(quiz.q4_options);
// //   const [question4correctoption, setquestion4correctoption] = useState(
// //     quiz.q4_correct_option
// //   );

// //   const [question5, setquestion5] = useState(quiz.q5);
// //   const [question5options, setquestion5options] = useState(quiz.q5_options);
// //   const [question5correctoption, setquestion5correctoption] = useState(
// //     quiz.q5_correct_option
// //   );

// //   const navigate = useNavigate();
// //   const handleSubmit = e => {
// //     e.preventDefault();
// //     if (
// //       quizname === "" ||
// //       imageurl === "" ||
// //       description === "" ||
// //       no_of_questions === "" ||
// //       passmark === "" ||
// //       totalmark === "" ||
// //       question1 === "" ||
// //       question1options === "" ||
// //       question1correctoption === "" ||
// //       question2 === "" ||
// //       question2options === "" ||
// //       question2correctoption === "" ||
// //       question3 === "" ||
// //       question3options === "" ||
// //       question3correctoption === "" ||
// //       question4 === "" ||
// //       question4options === "" ||
// //       question4correctoption === "" ||
// //       question5 === "" ||
// //       question5options === "" ||
// //       question5correctoption === ""
// //     ) {
// //       alert("please fill all fields");
// //     } else {
// //       axios
// //         .put(API_BASE_URL + "editquiz", {
// //           id: quiz.id,
// //           name: quizname,
// //           imageurl: imageurl,
// //           description: description,
// //           no_of_questions: no_of_questions,
// //           passmark: passmark,
// //           totalmark: totalmark,
// //           q1: question1,
// //           q1_options: question1options,
// //           q1_correct_option: question1correctoption,
// //           q2: question2,
// //           q2_options: question2options,
// //           q2_correct_option: question2correctoption,
// //           q3: question3,
// //           q3_options: question3options,
// //           q3_correct_option: question3correctoption,
// //           q4: question4,
// //           q4_options: question4options,
// //           q4_correct_option: question4correctoption,
// //           q5: question5,
// //           q5_options: question5options,
// //           q5_correct_option: question5correctoption,
// //           creationdate: today,
// //           createdby: user.email
// //         })
// //         .then(res => {
// //           console.log(res.data);
// //           if (res.data.status === 200) {
// //             alert(res.data.message);
// //             navigate("/viewquiz");
// //           }
// //         });
// //     }
// //   };
// //   return (
// //     <Box>
// //       <AdminappBar />
// //       <br />
// //       <br />
// //       <Container
// //         sx={{
// //           width: "30%",
// //           background: "#fff",
// //           mt: 3,
// //           paddingInline: "20px",
// //           paddingBlock: "20px",
// //           borderRadius: "10px"
// //         }}
// //       >
// //         <Stack sx={{ mt: 2 }} spacing={4}>
// //           <Typography variant="h5" sx={{ textAlign: "center" }}>
// //             EDIT QUIZ
// //           </Typography>

// //           <TextField
// //             fullWidth
// //             label="Quiz Name"
// //             id="fullWidth"
// //             value={quizname}
// //             onChange={e => setquizname(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Image Url"
// //             id="fullWidth"
// //             value={imageurl}
// //             onChange={e => setimageurl(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Description"
// //             id="fullWidth"
// //             value={description}
// //             onChange={e => setdescription(e.target.value)}
// //           />

// //           <TextField
// //             fullWidth
// //             label="Pass Mark"
// //             id="fullWidth"
// //             value={passmark}
// //             onChange={e => setpassmark(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Total Mark"
// //             id="fullWidth"
// //             value={totalmark}
// //             onChange={e => settotalmark(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Question 1"
// //             id="fullWidth"
// //             value={question1}
// //             onChange={e => setquestion1(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Question 1 Options with , (eg: option1,option2,etc..)"
// //             id="fullWidth"
// //             value={question1options}
// //             onChange={e => setquestion1options(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Question 1 Correct Option"
// //             id="fullWidth"
// //             value={question1correctoption}
// //             onChange={e => setquestion1correctoption(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Question 2"
// //             id="fullWidth"
// //             value={question2}
// //             onChange={e => setquestion2(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Question 2 Options with , (eg: option1,option2,etc..)"
// //             id="fullWidth"
// //             value={question2options}
// //             onChange={e => setquestion2options(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Question 2 Correct Option"
// //             id="fullWidth"
// //             value={question2correctoption}
// //             onChange={e => setquestion2correctoption(e.target.value)}
// //           />

// //           <TextField
// //             fullWidth
// //             label="Question 3"
// //             id="fullWidth"
// //             value={question3}
// //             onChange={e => setquestion3(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Question 3 Options with , (eg: option1,option2,etc..)"
// //             id="fullWidth"
// //             value={question3options}
// //             onChange={e => setquestion3options(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Question 3 Correct Option"
// //             id="fullWidth"
// //             value={question3correctoption}
// //             onChange={e => setquestion3correctoption(e.target.value)}
// //           />

// //           <TextField
// //             fullWidth
// //             label="Question 4"
// //             id="fullWidth"
// //             value={question4}
// //             onChange={e => setquestion4(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Question 4 Options with , (eg: option1,option2,etc..)"
// //             id="fullWidth"
// //             value={question4options}
// //             onChange={e => setquestion4options(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Question 4 Correct Option"
// //             id="fullWidth"
// //             value={question4correctoption}
// //             onChange={e => setquestion4correctoption(e.target.value)}
// //           />

// //           <TextField
// //             fullWidth
// //             label="Question 5"
// //             id="fullWidth"
// //             value={question5}
// //             onChange={e => setquestion5(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Question 5 Options with , (eg: option1,option2,etc..)"
// //             id="fullWidth"
// //             value={question5options}
// //             onChange={e => setquestion5options(e.target.value)}
// //           />
// //           <TextField
// //             fullWidth
// //             label="Question 5 Correct Option"
// //             id="fullWidth"
// //             value={question5correctoption}
// //             onChange={e => setquestion5correctoption(e.target.value)}
// //           />

// //           <Button variant="contained" onClick={handleSubmit}>
// //             Update
// //           </Button>
// //         </Stack>
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default Updatequiz;
