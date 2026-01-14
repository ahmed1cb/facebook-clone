import { createSlice } from '@reduxjs/toolkit'
import { getAuthorizedUser } from './Services'

const initialState = {
    user: null,
    state: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {


    },
    extraReducers: (b) => {
        // User

        b.addCase(getAuthorizedUser.pending, (s) => {
            s.loading = true;
            s.state = 'Loading'

        }).addCase(getAuthorizedUser.rejected, (s, a) => {
            s.state = 'Fail'
        }).addCase(getAuthorizedUser.fulfilled, (s, a) => {
            if (!a.payload) {
                s.state = 'Error'
                return
            }
            s.state = 'Success'

            s.user = a.payload.data.user
        })



    }
})


export default authSlice.reducer