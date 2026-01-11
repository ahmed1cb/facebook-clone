import { configureStore } from '@reduxjs/toolkit'
import AuthReduced from './Features/Auth/AuthSlice'
import PostsReducer from './Features/Posts/PostsSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReduced,
    posts: PostsReducer
  },
})
