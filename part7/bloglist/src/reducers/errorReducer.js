import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const errorSlice = createSlice({
  name: "errorMessage",
  initialState,
  reducers: {
    updateErrorMessage(_state, action) {
      return action.payload;
    },
    removeErrorMessage(_state, action) {
      return "";
    },
  },
});

export const { updateErrorMessage, removeErrorMessage } = errorSlice.actions;

export const setErrorMessage = (content, duration) => async (dispatch) => {
  dispatch(updateErrorMessage(content));
  setTimeout(() => {
    dispatch(removeErrorMessage());
  }, duration * 1000);
};

export default errorSlice.reducer;
