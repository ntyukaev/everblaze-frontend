import { useQuery } from '@apollo/client'
import { FC } from 'react'
import { ChartsData, ChartsVars, GET_CHARTS } from '../../../../operations/queries/getCharts'
import Chart from '../Chart'
import styles from './ChartList.module.scss'

interface IChartList {
  selectedSheet: number,
  scale: number
}

const ChartList: FC<IChartList> = ({ selectedSheet, scale }) => {
  const { error, loading, data } = useQuery<ChartsData, ChartsVars>(GET_CHARTS, { variables: { sheetId: selectedSheet } })

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
      {data!.charts.map((chart) => (
        <Chart scale={scale} key={chart.id} {...chart} />
      ))}
    </div>
  )
}

export default ChartList
