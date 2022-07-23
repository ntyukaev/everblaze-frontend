import { FC } from 'react'
import { ChartTypeEnum } from '../../../../../types'
import { FieldMapping, IInputData } from '../utils'
import chartTypes from './chartTypes'

type ChartBuilderProps = {
  type: keyof typeof ChartTypeEnum,
  data: IInputData,
  fields: FieldMapping
}

const ChartBuilder: FC<ChartBuilderProps> = ({ type, data, fields }) => {
  const ChartComponent = chartTypes[type]
  return (
    <ChartComponent data={data} fields={fields}/>
  )
}

export default ChartBuilder
