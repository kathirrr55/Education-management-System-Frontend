import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    value: {
      id: "",
      name: "",
      imageurl: "",
      videourl: "",
      price: "",
      description: "",
      category: ""
    }
  },
  reducers: {
    getProductData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { getProductData } = productSlice.actions;

export default productSlice.reducer;
