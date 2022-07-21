import { useEffect, useReducer } from 'react'
import scaleReducer, { initialState } from './scaleReducer'

const ScaleOnCtrlWheel = (Component) => function ScaleOnCtrlWheel (props) {
  const [scaleConfig, dispatch] = useReducer(scaleReducer, initialState)
  const handleMouseWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault()
      if (e.deltaY > 0) {
        dispatch({ type: 'decrement' })
      } else {
        dispatch({ type: 'increment' })
      }
    }
  }

  const setScale = (val) => {
    dispatch({ type: 'set', payload: val })
  }

  /* Component Did Mount */
  useEffect(() => {
    window.addEventListener('mousewheel', handleMouseWheel, { passive: false })
  }, [])

  /* Component Will Unmount */
  useEffect(() => {
    return () => {
      window.removeEventListener('mousewheel', handleMouseWheel, { passive: false })
    }
  }, [])

  return (
    <Component scaleConfig={scaleConfig} setScale={setScale} {...props} />
  )
}

export default ScaleOnCtrlWheel
