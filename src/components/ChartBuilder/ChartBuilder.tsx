import { FC } from 'react'
import { ChartTypeEnum } from '../../ts/enums'
import { FieldMapping, IInputData } from '../Chart/utils'
import chartTypes from './chartTypes'

type ChartBuilderImpl = {
  type: keyof typeof ChartTypeEnum,
  data: IInputData,
  fields: FieldMapping
}

const ChartBuilder: FC<ChartBuilderImpl> = ({ type, data, fields }) => {
  const ChartComponent = chartTypes[type]
  return (
    <ChartComponent data={data} fields={fields}/>
  )
}

export default ChartBuilder
