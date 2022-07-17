import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ChartList from '../ChartList'
import styles from './ChartSheet.module.scss'

const ChartSheetContainer = styled.div.attrs(({ scale }) => ({
  style: {
    transform: `scale(${scale}, ${scale})`
  }
}))``

const ChartSheet = () => {
  const scale = useSelector((state) => state.sheetScale.scale)
  return (
    <ChartSheetContainer scale={scale} className={styles.ChartSheet}>
      <ChartList/>
    </ChartSheetContainer>
  )
}

export default ChartSheet
