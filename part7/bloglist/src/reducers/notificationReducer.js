import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotification(_state, action) {
      return action.payload;
    },
    removeNotification(_state, action) {
      return "";
    },
  },
});

export const { updateNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (content, duration) => async (dispatch) => {
  dispatch(updateNotification(content));
  setTimeout(() => {
    dispatch(removeNotification());
  }, duration * 1000);
};

export default notificationSlice.reducer;
