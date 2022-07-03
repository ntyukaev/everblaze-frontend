import { useSelector } from 'react-redux'
import styled from 'styled-components'
import styles from './ChartSheet.module.scss'

const ChartSheetContainer = styled.div.attrs(({ scale }) => ({
  style: {
    transform: `scale(${scale}, ${scale})`
  }
}))``

const ChartSheet = () => {
  const scale = useSelector((state) => state.sheetScale.scale)
  return (
    <ChartSheetContainer scale={scale} className={styles.ChartSheet} />
  )
}

export default ChartSheet
