import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import Cookie from "../../../Cookie/Cookie";


const getPosts = createAsyncThunk('getPosts', async (page, { rejectWithValue }) => {

    try {
        let token = Cookie.get('authorization');

        const response = await api.get(`/posts?page=${page}`, {
            headers: {
                Authorization: token
            }
        });

        return response.data;

    } catch (e) {
        return rejectWithValue(e.data)
    }

})



const getVideos = createAsyncThunk('getVideos', async (page, { rejectWithValue }) => {

    try {
        let token = Cookie.get('authorization');

        const response = await api.get(`/posts/videos?page=${page}`, {
            headers: {
                Authorization: token
            }
        });

        return response.data;

    } catch (e) {
       return  rejectWithValue(e.data)
    }

})



export { getPosts, getVideos }