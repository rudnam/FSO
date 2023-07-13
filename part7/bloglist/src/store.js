import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./reducers/errorReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    errorMessage: errorReducer,
  },
});

export default store;
