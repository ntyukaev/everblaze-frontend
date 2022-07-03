import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  scale: 1.0,
  MIN_SCALE: 0.15,
  MAX_SCALE: 1.5,
  STEP: 0.05
}

export const sheetScaleSlice = createSlice({
  name: 'sheetScale',
  initialState,
  reducers: {
    increment: (state) => {
      state.scale += state.STEP
      state.scale = Math.min(state.MAX_SCALE, state.scale)
    },
    decrement: (state) => {
      state.scale -= state.STEP
      state.scale = Math.max(state.MIN_SCALE, state.scale)
    },
    setValue: (state, action) => {
      state.scale = action.payload
      state.scale = Math.min(state.MAX_SCALE, state.scale)
      state.scale = Math.max(state.MIN_SCALE, state.scale)
    }
  }
})

export const { increment, decrement, setValue } = sheetScaleSlice.actions

export default sheetScaleSlice.reducer
