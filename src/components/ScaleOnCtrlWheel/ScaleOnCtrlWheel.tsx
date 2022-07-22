import { useEffect, useReducer } from 'react'
import scaleReducer, { initialState, decrement, increment, set } from './scaleReducer'

const ScaleOnCtrlWheel = (Component:any) => function ScaleOnCtrlWheel (props:any) {
  const [scaleConfig, dispatch] = useReducer(scaleReducer, initialState)
  const handleMouseWheel = (e: any) => {
    if (e.ctrlKey) {
      e.preventDefault()
      if (e.deltaY > 0) {
        dispatch(decrement)
      } else {
        dispatch(increment)
      }
    }
  }

  const setScale = (val:number) => {
    dispatch(set(val))
  }

  /* Component Did Mount */
  useEffect(() => {
    window.addEventListener('mousewheel', handleMouseWheel, { passive: false })
  }, [])

  /* Component Will Unmount */
  useEffect(() => {
    return () => {
      window.removeEventListener('mousewheel', handleMouseWheel)
    }
  }, [])

  return (
    <Component scaleConfig={scaleConfig} setScale={setScale} {...props} />
  )
}

export default ScaleOnCtrlWheel
