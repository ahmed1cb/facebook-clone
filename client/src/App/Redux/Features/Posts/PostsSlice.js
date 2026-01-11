import { createSlice } from '@reduxjs/toolkit'
import { getPosts } from './Services'

const initialState = {
    posts: null,
    state: "Loading"
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b.addCase(getPosts.pending, (s) => {
            s.state = 'Loading'
        }).addCase(getPosts.rejected, (s) => {
            s.state = 'Fail'
        }).addCase(getPosts.fulfilled, (s, a) => {
            s.posts = a.payload?.data?.data?.posts || []
            s.state = 'Success'
        })


    }
})


export default postsSlice.reducer