import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
    },
    setUsers(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      const { id } = action.payload;
      return state.filter((user) => user.id !== id);
    },
  },
});

export const { addUser, setUsers, removeUser } = userSlice.actions;

export const initializeUsers = () => async (dispatch) => {
  const users = await userService.getAll();
  dispatch(setUsers(users));
};

export const createUser = (userObject) => async (dispatch) => {
  const newUser = await userService.create(userObject);
  dispatch(addUser(newUser));
};

export const deleteUser = (userObject) => async (dispatch) => {
  await userService.remove(userObject.id);
  dispatch(removeUser(userObject));
};

export default userSlice.reducer;
