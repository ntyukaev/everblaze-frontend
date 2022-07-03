import { useEffect } from 'react'

const WMWWrapper = ({ children, onWindowMouseWheel }) => {
  const handleMouseWheel = (e) => {
    if (onWindowMouseWheel) onWindowMouseWheel(e)
  }

  /* Component Did Mount */
  useEffect(() => {
    if (onWindowMouseWheel) {
      window.addEventListener('mousewheel', handleMouseWheel, { passive: false })
    }
  }, [])

  /* Component Will Unmount */
  useEffect(() => {
    return () => {
      window.removeEventListener('mousewheel', handleMouseWheel, { passive: false })
    }
  }, [])

  return children
}

export default WMWWrapper
