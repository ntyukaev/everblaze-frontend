import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ScaleOnCtrlWheel from '../../../ScaleOnCtrlWheel'
import ChartList from '../ChartList'
import styles from './Sheet.module.scss'

const ScalableSheetContainer = styled.div.attrs(({ scale }) => ({
  style: {
    transform: `scale(${scale}, ${scale})`
  }
}))``

const Sheet = ({ selectedSheet }) => {
  const scale = useSelector((state) => state.sheetScale.scale)
  return (
    <div className={styles.Sheet}>
      <ScalableSheetContainer scale={scale} className={styles.ScalableSheetContainer}>
        <ChartList selectedSheet={selectedSheet} />
      </ScalableSheetContainer>
    </div>
  )
}

Sheet.propTypes = {
  selectedSheet: PropTypes.number
}

export default ScaleOnCtrlWheel(Sheet)
