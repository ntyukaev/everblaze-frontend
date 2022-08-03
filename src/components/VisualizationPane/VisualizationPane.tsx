import { Button } from 'antd'
import { FC } from 'react'
import { createChart, updateChart } from '../../operations/store'
import { ChartTypeEnum, SelectableChart, SelectableSheet } from '../../types'
import ChartFieldList from '../ChartFieldList'

interface IVisualizationPane extends SelectableSheet, SelectableChart {}

const VisualizationPane: FC<IVisualizationPane> = ({ selectedSheet, selectedChart }) => {
  const handleCreateChart = () => {
    createChart({ type: ChartTypeEnum.LINE_CHART, x: 0, y: 0, width: 0.3, height: 0.3 }, { sheetId: selectedSheet })
  }

  const handleToLineChart = () => {
    if (selectedChart) {
      updateChart({ type: ChartTypeEnum.LINE_CHART }, selectedChart)
    } else {
      console.log('Not yet implemented')
    }
  }

  const handleToBarChart = () => {
    if (selectedChart) {
      updateChart({ type: ChartTypeEnum.BAR_CHART }, selectedChart)
    } else {
      console.log('Not yet implemented')
    }
  }

  return (
    <div>
      <Button onClick={handleCreateChart}>Create Chart</Button>
      <Button onClick={handleToLineChart}>{ChartTypeEnum.LINE_CHART}</Button>
      <Button onClick={handleToBarChart}>{ChartTypeEnum.BAR_CHART}</Button>
      { selectedChart && <ChartFieldList selectedChart={selectedChart} /> }
    </div>
  )
}

export default VisualizationPane
