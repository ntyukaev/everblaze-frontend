
export const initialState = {
  scale: 1.0,
  minScale: 0.15,
  maxScale: 1.5,
  step: 0.05
}

const scaleReducer = (state, action) => {
  let scale = state.scale
  if (action.type === 'increment') {
    scale += state.step
    scale = Math.min(state.maxScale, scale)
  } else if (action.type === 'decrement') {
    scale -= state.step
    scale = Math.max(state.minScale, scale)
  } else if (action.type === 'set') {
    scale = action.payload
    scale = Math.max(state.minScale, scale)
    scale = Math.min(state.maxScale, scale)
  }
  return { ...state, scale }
}

export default scaleReducer
