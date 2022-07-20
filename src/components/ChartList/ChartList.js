import PropTypes from 'prop-types'
import { useCharts } from '../../hooks'
import ChartContainer from '../ChartContainer'
import styles from './ChartList.module.scss'
// import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'

const ChartList = ({ selectedSheet }) => {
  const { loading, data } = useCharts(+selectedSheet)
  if (loading) {
    return (
      <div className={styles.ChartList}>Loading</div>
    )
  }

  return (
    <div className={styles.ChartList}>
      {data.charts.map((chart) => (
        <ChartContainer key={chart.id} {...chart} />
      ))}
    </div>
  )
}

ChartList.propTypes = {
  selectedSheet: PropTypes.number
}

export default ChartList
