import { useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { GET_CHARTS } from '../../../../operations/queries/getCharts'
import Chart from '../Chart'
import styles from './ChartList.module.scss'

const ChartList = ({ selectedSheet, scale }) => {
  const { error, loading, data } = useQuery(GET_CHARTS, { variables: { sheetId: selectedSheet } })

  if (error) {
    return (
      <div>An error occured</div>
    )
  }

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
