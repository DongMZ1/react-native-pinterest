import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { PostType } from '../../types/posts'

type UtilitySliceInitialStateType = {
    safeAreaViewDimension: {
        height: number,
        width: number
    },
    keyboard:{
        keyboardheight: number
    },
    modalContent: string
}

const initialState : UtilitySliceInitialStateType  = {
    safeAreaViewDimension: {
        height: 0,
        width: 0
    },
    keyboard: {
        keyboardheight: 0
    },
    modalContent: ''
}
export const utilitySlice = createSlice({
    name: 'utility',
    initialState: initialState,
    reducers: {
        setSafeAreaViewDimension: (state, action: PayloadAction<{height: number, width: number}>) => {
            state.safeAreaViewDimension = {
                height: action.payload.height,
                width: action.payload.width
            }
        },
        
        setKeyboardH: (state, action: PayloadAction<number>) => {
            state.keyboard.keyboardheight = action.payload
        },

        setModalContent: (state, action: PayloadAction<string>) => {
            state.modalContent = action.payload;
        }
    },
})

export const { setSafeAreaViewDimension, setKeyboardH, setModalContent } = utilitySlice.actions
export const selectSafeAreaViewDimension = (state :RootState) => state.utilitySlice.safeAreaViewDimension
export const selectKeyboard = (state :RootState) => state.utilitySlice.keyboard
export const selectModalContentString = (state: RootState) => state.utilitySlice.modalContent
export default utilitySlice.reducer