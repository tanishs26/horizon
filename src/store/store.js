import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./authReducer";
const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});
export default store;