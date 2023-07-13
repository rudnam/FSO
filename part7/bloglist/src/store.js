import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./reducers/errorReducer";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    errorMessage: errorReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});

export default store;
