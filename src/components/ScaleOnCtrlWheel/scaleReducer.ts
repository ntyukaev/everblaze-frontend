import { Scalable } from './../../types/index'

export interface ScaleConfig extends Scalable {
  minScale: number,
  maxScale: number,
  step: number
}

export const initialState: ScaleConfig = {
  scale: 1.0,
  minScale: 0.15,
  maxScale: 1.5,
  step: 0.05
}

enum ActionKind {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  SET = 'SET'
}

type Action = {
  type: ActionKind,
  payload?: number
}

export const increment: Action = {
  type: ActionKind.INCREMENT
}

export const decrement: Action = {
  type: ActionKind.DECREMENT
}

export const set = (val:number): Action => {
  return {
    type: ActionKind.DECREMENT,
    payload: val
  }
}

const scaleReducer = (state: ScaleConfig, action: Action) => {
  let scale = state.scale
  if (action.type === ActionKind.INCREMENT) {
    scale += state.step
    scale = Math.min(state.maxScale, scale)
  } else if (action.type === ActionKind.DECREMENT) {
    scale -= state.step
    scale = Math.max(state.minScale, scale)
  } else if (action.type === ActionKind.SET) {
    scale = action.payload!
    scale = Math.max(state.minScale, scale)
    scale = Math.min(state.maxScale, scale)
  }
  return { ...state, scale }
}

export default scaleReducer
