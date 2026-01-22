import { createSlice } from '@reduxjs/toolkit'
import { getPosts, getVideos } from './Services'

const initialState = {
    posts: null,
    videos: null,
    state: "Loading"
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            const updated = action.payload;
            const index = state.posts.findIndex(p => p.id === updated.id);
            if (index !== -1) {
                state.posts[index] = updated;
            }
        }
    },

    extraReducers: (b) => {
        b.addCase(getPosts.pending, (s) => {
            s.state = 'Loading'
        }).addCase(getPosts.rejected, (s) => {
            s.state = 'Fail'
        }).addCase(getPosts.fulfilled, (s, a) => {
            s.posts = a.payload?.data?.posts || []
            s.state = 'Success'
        })


        b.addCase(getVideos.pending, (s) => {
            s.state = 'Loading'
        }).addCase(getVideos.rejected, (s) => {
            s.state = 'Fail'
        }).addCase(getVideos.fulfilled, (s, a) => {
            s.videos = a.payload?.data?.videos || []
            s.state = 'Success'
        })


    }
})


export const { setPosts } = postsSlice.actions

export default postsSlice.reducer