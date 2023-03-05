import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
const initialState = {
    isLogin: false,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload
        },
    },
})

export const { updateIsLogin } = authSlice.actions
export const selectAuthIsLogin = (state :RootState) => state.authSlice.isLogin
export default authSlice.reducer