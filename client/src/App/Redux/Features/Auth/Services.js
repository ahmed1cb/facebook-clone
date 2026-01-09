import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../services/api'

const getAuthorizedUser = createAsyncThunk(
    'user/auth',
    async (token, { rejectWithValue }) => {
        try {

            const response = await api.get('/auth/user', {
                headers: {
                    'Authorization': token
                }
            })

            return response.data
        } catch (e) {
            rejectWithValue(e)
        }
    },
)



export { getAuthorizedUser }