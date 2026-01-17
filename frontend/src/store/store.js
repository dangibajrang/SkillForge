import { configureStore } from '@reduxjs/toolkit';
// TODO: Import slices as they are created
// import authSlice from './slices/authSlice';
// import courseSlice from './slices/courseSlice';

export const store = configureStore({
  reducer: {
    // TODO: Add reducers
    // auth: authSlice,
    // courses: courseSlice,
  },
});
