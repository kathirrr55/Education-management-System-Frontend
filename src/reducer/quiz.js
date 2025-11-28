import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    value: {
      id: "",
      name: "",
      imageurl: "",
      description: "",
      no_of_questions: "",
      passmark: "",
      totalmark: "",
      q1: "",
      q1_options: "",
      q1_correct_option: "",
      q2: "",
      q2_options: "",
      q2_correct_option: "",
      q3: "",
      q3_options: "",
      q3_correct_option: "",
      q4: "",
      q4_options: "",
      q4_correct_option: "",
      q5: "",
      q5_options: "",
      q5_correct_option: "",
      creationdate: "",
      createdby: ""
    }
  },
  reducers: {
    getQuizData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { getQuizData } = quizSlice.actions;

export default quizSlice.reducer;
