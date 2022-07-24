import { Button } from 'antd'
import { FC } from 'react'
import { createChart, deleteChart } from '../../../../operations/store'
import { ChartTypeEnum, SelectableChart, SelectableSheet } from '../../../../types'

interface IVisualizationPane extends SelectableSheet, SelectableChart {}

const VisualizationPane: FC<IVisualizationPane> = ({ selectedSheet, selectedChart }) => {
  const handleCreateChart = () => {
    createChart({ type: ChartTypeEnum.LINE_CHART, x: 0, y: 0 }, { sheetId: selectedSheet })
  }

  const handleDeleteChart = () => {
    deleteChart(selectedChart)
  }
  return (
    <div>
      <Button onClick={handleCreateChart}>Create Chart</Button>
      <Button>{ChartTypeEnum.LINE_CHART}</Button>
      { selectedChart && <Button onClick={handleDeleteChart}>Delete Chart</Button> }
    </div>
  )
}

export default VisualizationPane
