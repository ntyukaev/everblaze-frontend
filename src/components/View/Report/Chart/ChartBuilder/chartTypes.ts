import { ChartTypeEnum } from '../../../../../types'
import LineChart from './LineChart'

const chartTypes = {
  [ChartTypeEnum.LINE_CHART]: LineChart,
  [ChartTypeEnum.BAR_CHART]: LineChart
}

export default chartTypes
