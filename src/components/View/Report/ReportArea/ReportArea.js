import PropTypes from 'prop-types'
import ChartSheet from '../ChartSheet'
import ScaleOnCtrlWheel from '../../../ScaleOnCtrlWheel'
import styles from './ReportArea.module.scss'

const ReportArea = ({ selectedSheet }) => {
  console.log(selectedSheet)
  return (
    <div className={styles.ReportArea}>
      <ChartSheet selectedSheet={selectedSheet}/>
    </div>
  )
}

ReportArea.propTypes = {
  selectedSheet: PropTypes.number
}

export default ScaleOnCtrlWheel(ReportArea)
