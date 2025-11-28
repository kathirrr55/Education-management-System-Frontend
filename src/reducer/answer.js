import { createSlice } from "@reduxjs/toolkit";

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    value: {
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
      c5: ""
    }
  },
  reducers: {
    getAnswerData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { getAnswerData } = answerSlice.actions;

export default answerSlice.reducer;
