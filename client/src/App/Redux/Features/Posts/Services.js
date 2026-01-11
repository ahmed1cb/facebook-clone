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

        return response;

    } catch (e) {
        rejectWithValue(e)
    }

})


export { getPosts }