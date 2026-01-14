import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './Features/Auth/AuthSlice'
import PostsReducer from './Features/Posts/PostsSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    posts: PostsReducer
  },
})
