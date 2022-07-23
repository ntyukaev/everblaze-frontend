import { FC, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client'
import { ChartsData, ChartsVars, GET_CHARTS } from '../../../../operations/queries/getCharts'
import Chart from '../Chart'
import styles from './ChartList.module.scss'
import { selectedChartVar } from '../../../../apollo'
import { Scalable, SelectableSheet } from '../../../../types'

interface IChartList extends SelectableSheet, Scalable {}

const ChartList: FC<IChartList> = ({ selectedSheet, scale }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { error, loading, data } = useQuery<ChartsData, ChartsVars>(GET_CHARTS, { variables: { sheetId: selectedSheet } })

  useEffect(() => {
    if (ref.current) {
      if (selectedChartVar() != null) {
        ref.current.addEventListener('mousedown', unselect)
      } else {
        ref.current.removeEventListener('mousedown', unselect)
      }
    }
  }, [selectedChartVar(), ref])

  const unselect = () => {
    // @ts-ignore: Object is possibly 'null'
    ref.current.removeEventListener('mouseup', unselect)
    selectedChartVar(null)
  }

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
    <div ref={ref} className={styles.ChartList}>
      {data!.charts.map((chart) => (
        <Chart scale={scale} key={chart.id} {...chart} />
      ))}
    </div>
  )
}

export default ChartList
