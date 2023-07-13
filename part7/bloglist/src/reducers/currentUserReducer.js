import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: null,
  reducers: {
    updateCurrentUserInState(_state, action) {
      return action.payload;
    },
    removeCurrentUserInState(_state, action) {
      return null;
    },
  },
});

export const { updateCurrentUserInState, removeCurrentUserInState } =
  currentUserSlice.actions;

export const setCurrentUser = (user) => async (dispatch) => {
  blogService.setToken(user.token);
  dispatch(updateCurrentUserInState(user));
};

export default currentUserSlice.reducer;
