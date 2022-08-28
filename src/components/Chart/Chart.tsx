import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { Rnd, RndDragCallback, RndResizeCallback, RndResizeStartCallback } from 'react-rnd'
import { fieldsSameLength, getInputData, getColumnNames, getFieldMapping } from './utils'
import { GET_FIELDS } from '../../operations/queries/getFields'
import { FieldsData, FieldsVars, ChartImpl, Scalable, SelectableChart } from '../../ts/interfaces'
import { Identity } from '../../ts/types'
import ChartBuilder from '../ChartBuilder'
import styles from './Chart.module.scss'
import { updateReport } from '../../operations/store/report'
import { updateChart } from '../../operations/store/chart'

interface ChartWithScale extends Scalable, ChartImpl, SelectableChart {
  reportId: Identity,
  setChartUpdating: Function,
  height: number,
  width: number,
  canvasHeight: number,
  canvasWidth: number,
  grid: [number, number]
}

const withDraggable = (Component: any) => function withDraggable ({ canvasHeight, grid, canvasWidth, height, width, x, y, scale, type, id, reportId, selectedChart, setChartUpdating }: ChartWithScale) {
  const handleMouseDown = () => {
    updateReport({ selectedChart: id }, { reportId })
  }

  const handleDragStart: RndDragCallback = () => {
    setChartUpdating(true)
  }

  const handleDrag: RndDragCallback = (_, data) => {
    const { x, y } = data
    updateChart({ x, y }, id)
  }

  const handleDragStop: RndDragCallback = () => {
    setChartUpdating(false)
  }

  const handleResizeStart:RndResizeStartCallback = () => {
    setChartUpdating(true)
  }

  const handleResize:RndResizeCallback = (_, __, elementRef) => {
    const height = elementRef.offsetHeight / canvasHeight
    const width = elementRef.offsetWidth / canvasWidth
    updateChart({ width, height }, id)
  }

  const handleResizeStop:RndResizeCallback = () => {
    updateReport({ selectedChart: id }, { reportId })
    setChartUpdating(false)
  }

  return (
    <Rnd
      size={{ width: width * canvasWidth, height: height * canvasHeight }}
      dragGrid={grid}
      resizeGrid={grid}
      position={{ x, y }}
      onMouseDown={handleMouseDown}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
      onResizeStart={handleResizeStart}
      onResize={handleResize}
      onResizeStop={handleResizeStop}
      bounds='parent'
      scale={scale}
      className={`${styles.Chart}` + (selectedChart === id ? ` ${styles.ChartSelected}` : '')}
    >
      <Component reportId={reportId} type={type} id={id} />
    </Rnd>
  )
}

const Chart: FC<ChartWithScale> = ({ type, id }) => {
  const chartId = id
  const { error, loading, data } = useQuery<FieldsData, FieldsVars>(GET_FIELDS, { variables: { chartId } })

  if (error) {
    return (
      <div>An error occured</div>
    )
  }
  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  if (!(data!.fields.length > 0)) {
    return (
      <div>No Fields Provided</div>
    )
  }
  if (!fieldsSameLength(data!.fields)) {
    return (
      <div>Fields Are Not Same Length.</div>
    )
  }

  const columnNames = getColumnNames(data!.fields)
  const inputData = getInputData(data!.fields, columnNames)
  const fieldMapping = getFieldMapping(data!.fields, columnNames)

  return (
    <div className={styles.ChartInner}>
      <ChartBuilder type={type} data={inputData} fields={fieldMapping} />
    </div>
  )
}

export default withDraggable(Chart)
