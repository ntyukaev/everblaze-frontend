import { ChartTypeEnum, FieldTypeEnum } from './../../types/index'

const fieldTypes = {
  [ChartTypeEnum.LINE_CHART]: [FieldTypeEnum.X, FieldTypeEnum.Y],
  [ChartTypeEnum.BAR_CHART]: [FieldTypeEnum.X, FieldTypeEnum.Y]
}

export default fieldTypes
