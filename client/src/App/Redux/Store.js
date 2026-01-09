import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './Features/Auth/AuthSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
})
