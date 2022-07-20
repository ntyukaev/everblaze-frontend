import { useDispatch } from 'react-redux'
import { increment, decrement } from '../../reducers/sheetScale'
import { useEffect } from 'react'

const ScaleOnCtrlWheel = (Component) => function ScaleOnCtrlWheel (props) {
  const dispatch = useDispatch()
  const handleMouseWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault()
      if (e.deltaY > 0) {
        dispatch(decrement())
      } else {
        dispatch(increment())
      }
    }
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
    <Component {...props} />
  )
}

export default ScaleOnCtrlWheel
