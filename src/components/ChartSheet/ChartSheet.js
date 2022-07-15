import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Rnd } from 'react-rnd'
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
      <Rnd
        className={styles.Rnd}
        bounds='parent'
        default={{
          x: 0,
          y: 0,
          width: '30%',
          height: '30%'
        }}
      >
        Rnd
      </Rnd>
    </ChartSheetContainer>
  )
}

export default ChartSheet
