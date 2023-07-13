import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    updateUserInState(_state, action) {
      return action.payload;
    },
    removeUserInState(_state, action) {
      return null;
    },
  },
});

export const { updateUserInState, removeUserInState } = userSlice.actions;

export const setUser = (user) => async (dispatch) => {
  blogService.setToken(user.token);
  dispatch(updateUserInState(user));
};

export default userSlice.reducer;
