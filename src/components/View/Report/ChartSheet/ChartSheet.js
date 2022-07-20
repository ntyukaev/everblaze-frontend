import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ChartList from '../ChartList'
import styles from './ChartSheet.module.scss'

const ChartSheetContainer = styled.div.attrs(({ scale }) => ({
  style: {
    transform: `scale(${scale}, ${scale})`
  }
}))``

const ChartSheet = ({ selectedSheet }) => {
  const scale = useSelector((state) => state.sheetScale.scale)
  return (
    <ChartSheetContainer scale={scale} className={styles.ChartSheet}>
      <ChartList selectedSheet={ selectedSheet }/>
    </ChartSheetContainer>
  )
}

ChartSheet.propTypes = {
  selectedSheet: PropTypes.number
}

export default ChartSheet
