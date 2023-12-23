import { configureStore } from "@reduxjs/toolkit"; // step 1: import configureStore

// step 2: creating store
const store = configureStore({
  reducer: {},
});

export default store; // export store
