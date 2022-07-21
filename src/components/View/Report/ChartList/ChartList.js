import PropTypes from 'prop-types'
import { useCharts } from '../../../../hooks'
import Chart from '../Chart'
import styles from './ChartList.module.scss'

const ChartList = ({ selectedSheet, scale }) => {
  const { loading, data } = useCharts(+selectedSheet)
  if (loading) {
    return (
      <div className={styles.ChartList}>Loading</div>
    )
  }

  return (
    <div className={styles.ChartList}>
      {data.charts.map((chart) => (
        <Chart scale={scale} key={chart.id} {...chart} />
      ))}
    </div>
  )
}

ChartList.propTypes = {
  selectedSheet: PropTypes.number,
  scale: PropTypes.number
}

export default ChartList
