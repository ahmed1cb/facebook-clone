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
            state.posts = action.payload
        },
        setVideos: (state, action) => {
            const updated = action.payload;
            const index = state.videos.findIndex(p => p.id === updated.id);
            if (index !== -1) {
                state.videos[index] = updated;
            }
        }
    },

    extraReducers: (b) => {
        b.addCase(getPosts.pending, (s) => {
            s.state = 'Loading'
        }).addCase(getPosts.rejected, (s) => {
            s.state = 'Fail'
        }).addCase(getPosts.fulfilled, (s, a) => {
            const newPosts = a.payload?.data?.posts || [];
            s.posts = s.posts ? [...s.posts, ...newPosts] : newPosts;
            s.posts = s.posts.filter(
                (post, index, self) => self.findIndex(p => p.id === post.id) === index
            );
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


export const { setPosts, setVideos } = postsSlice.actions

export default postsSlice.reducer