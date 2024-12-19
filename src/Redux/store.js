// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slice/taskSlice';

// Create the Redux store
const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;
