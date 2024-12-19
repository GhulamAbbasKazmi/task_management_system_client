// src/redux/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filters: {
    status: 'all', // 'all', 'pending', 'in-progress', 'completed'
    dueDate: '', // empty or specific date
  },
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex(task => task._id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },
  },
});

export const { setTasks, setFilters, addTask, updateTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
