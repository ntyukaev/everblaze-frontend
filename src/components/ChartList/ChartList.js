import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useCharts } from '../../api/graphql'
import ChartContainer from '../ChartContainer'
import styles from './ChartList.module.scss'

const ChartList = () => {
  const sheetIndex = useSelector((state) => state.selectedSheet.selectedSheet)
  const { reportId } = useParams()
  const { loading, error, data } = useCharts(+reportId, +sheetIndex)
  if (loading || error) {
    return (
      <div className={styles.ChartList}>Loading...</div>
    )
  }
  return (
    <div className={styles.ChartList}>
      {data.sheet.charts.map((chart) => (
        <ChartContainer key={chart.id} fields={chart.fields} chartId={chart.id} x={chart.x} y={chart.y} type={chart.type} />
      ))}
    </div>
  )
}

export default ChartList
