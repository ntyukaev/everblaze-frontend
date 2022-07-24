import { Button } from 'antd'
import { FC } from 'react'
import { createChart, deleteChart, updateChart } from '../../../../operations/store'
import { ChartTypeEnum, SelectableChart, SelectableSheet } from '../../../../types'

interface IVisualizationPane extends SelectableSheet, SelectableChart {}

const VisualizationPane: FC<IVisualizationPane> = ({ selectedSheet, selectedChart }) => {
  const handleCreateChart = () => {
    createChart({ type: ChartTypeEnum.LINE_CHART, x: 0, y: 0 }, { sheetId: selectedSheet })
  }

  const handleDeleteChart = () => {
    deleteChart(selectedChart)
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
      { selectedChart && <Button onClick={handleDeleteChart}>Delete Chart</Button> }
    </div>
  )
}

export default VisualizationPane
