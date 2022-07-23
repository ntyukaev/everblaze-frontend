import { Button } from 'antd'
import { selectedSheetVar } from '../../../../apollo'
import createChart from '../../../../operations/store/createChart'
import { ChartTypeEnum } from '../../../../types'

const VisualizationPane = () => {
  const handleClick = () => {
    createChart({ type: ChartTypeEnum.LINE_CHART, x: 0, y: 0 }, { sheetId: selectedSheetVar() })
  }
  return (
    <div>
      <Button onClick={handleClick}>Create Chart</Button>
      <Button onClick={handleClick}>Delete Chart</Button>
      <Button>{ChartTypeEnum.LINE_CHART}</Button>
    </div>
  )
}

export default VisualizationPane
