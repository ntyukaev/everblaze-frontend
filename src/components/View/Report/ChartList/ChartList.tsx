import { FC, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client'
import { ChartsData, ChartsVars, GET_CHARTS } from '../../../../operations/queries/getCharts'
import Chart from '../Chart'
import styles from './ChartList.module.scss'
import { CrudEnum, Identity, Scalable, SelectableChart, SelectableSheet } from '../../../../types'
import { updateReport } from '../../../../operations/store'

interface IChartList extends SelectableSheet, SelectableChart, Scalable {
  reportId: Identity
}

const ChartList: FC<IChartList> = ({ reportId, selectedChart, selectedSheet, scale }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { error, loading, data } = useQuery<ChartsData, ChartsVars>(GET_CHARTS, { variables: { sheetId: selectedSheet } })

  useEffect(() => {
    if (ref.current) {
      if (selectedChart != null) {
        ref.current.addEventListener('mousedown', unselect)
      } else {
        ref.current.removeEventListener('mousedown', unselect)
      }
    }
  }, [selectedChart, ref])

  const unselect = () => {
    // @ts-ignore: Object is possibly 'null'
    ref.current.removeEventListener('mouseup', unselect)
    updateReport({ selectedChart: null }, { reportId })
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
      {data!.charts.filter((chart) => chart.status !== CrudEnum.DELETE).map((chart) => (
        <Chart selectedChart={selectedChart} reportId={reportId} scale={scale} key={chart.id} {...chart} />
      ))}
    </div>
  )
}

export default ChartList
