import { configureStore } from '@reduxjs/toolkit';
import verifyEmailReducer from './slice/verifyEmailSlice';
import verifyOtpReducer from './slice/verifyOtpSlice'; 

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    verifyEmail: verifyEmailReducer,
    verifyOtp: verifyOtpReducer,  
  },
});

export default store;
