import { createSlice } from '@reduxjs/toolkit'
import { getPosts, getVideos } from './Services'

const initialState = {
    posts: null,
    videos: null,
    state: "Normal",
    hasMore: true,
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },

        setVideos: (state, action) => {
            state.videos = action.payload;
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
            const newVideos = a.payload?.data?.videos || [];
            s.videos = s.videos ? [...s.videos, ...newVideos] : newVideos;
            s.videos = s.videos.filter(
                (video, index, self) => self.findIndex(v => v.id === video.id) === index
            );

            if (newVideos.length === 0) {
                s.hasMore = false
            }

            s.state = 'Success'
        })


    }
})


export const { setPosts, setVideos } = postsSlice.actions

export default postsSlice.reducer