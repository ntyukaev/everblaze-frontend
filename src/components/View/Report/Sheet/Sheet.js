import PropTypes from 'prop-types'
import styled from 'styled-components'
import ChartList from '../ChartList'
import styles from './Sheet.module.scss'

const ScalableSheetContainer = styled.div.attrs(({ scale }) => ({
  style: {
    transform: `scale(${scale}, ${scale})`
  }
}))``

const Sheet = ({ selectedSheet, scale }) => {
  return (
    <div className={styles.Sheet}>
      <ScalableSheetContainer scale={scale} className={styles.ScalableSheetContainer}>
        <ChartList scale={scale} selectedSheet={selectedSheet} />
      </ScalableSheetContainer>
    </div>
  )
}

Sheet.propTypes = {
  selectedSheet: PropTypes.number,
  scale: PropTypes.number
}

export default Sheet
