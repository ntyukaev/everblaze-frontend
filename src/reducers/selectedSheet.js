import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedSheet: 0
}

export const selectedSheetSlice = createSlice({
  name: 'selectedSheet',
  initialState,
  reducers: {
    selectSheet: (state, action) => {
      state.selectedSheet = action.payload
    }
  }
})

export const { selectSheet } = selectedSheetSlice.actions

export default selectedSheetSlice.reducer
