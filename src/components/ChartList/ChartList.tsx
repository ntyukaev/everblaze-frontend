import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_CHARTS } from '../../operations/queries/getCharts'
import { CrudEnum } from '../../ts/enums'
import { ChartsData, ChartsVars, Scalable, SelectableChart, SelectableSheet } from '../../ts/interfaces'
import Chart from '../Chart'
import styles from './ChartList.module.scss'
import { Identity } from '../../ts/types'
import { updateReport } from '../../operations/store/report'
import BoundingLines from '../BoundingLines/BoundingLines'
import { GridHelper } from './utils'

interface ChartListImpl extends SelectableSheet, SelectableChart, Scalable {
  reportId: Identity
}

const ChartList: FC<ChartListImpl> = ({ reportId, selectedChart, selectedSheet, scale }) => {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState<number>(0)
  const [gridConfig, setGridConfig] = useState<{bounds: number[][][], grid: [number, number]}>({ grid: [1, 1], bounds: [] })
  const [chartMoving, setChartMoving] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { error, loading, data } = useQuery<ChartsData, ChartsVars>(GET_CHARTS, { variables: { sheetId: selectedSheet } })

  const setChartUpdating = (val: boolean) => {
    setChartMoving(val)
  }

  useEffect(() => {
    if (ref.current) {
      if (selectedChart != null) {
        ref.current.addEventListener('mousedown', unselect)
      } else {
        ref.current.removeEventListener('mousedown', unselect)
      }
    }
  }, [selectedChart, ref])

  useEffect(() => {
    if (data?.charts && selectedChart) {
      const helper = new GridHelper(data!.charts, selectedChart, height, width)
      helper.snap()
      helper.createBounds()
      setGridConfig({
        grid: helper.grid,
        bounds: helper.bounds
      })
    }
  }, [data, selectedChart])

  useLayoutEffect(() => {
    setHeight(ref.current?.clientHeight || 0)
    setWidth(ref.current?.clientWidth || 0)
  })

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
      {chartMoving && <BoundingLines lines={gridConfig.bounds} width={width} height={height}/>}
      {data!.charts.filter((chart) => chart.status !== CrudEnum.DELETE).map((chart) => (
        <Chart
          grid={gridConfig.grid}
          canvasWidth={width}
          canvasHeight={height}
          setChartUpdating={setChartUpdating}
          selectedChart={selectedChart}
          reportId={reportId} scale={scale} key={chart.id} {...chart} />
      ))}
    </div>
  )
}

export default ChartList
