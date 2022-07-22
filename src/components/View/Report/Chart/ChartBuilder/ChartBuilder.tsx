import { FC } from 'react'
import { ChartTypes } from '../../../../../operations/queries/getCharts'
import { FieldMapping, IInputData } from '../utils'
import chartTypes from './chartTypes'

interface IChartBuilder {
  type: keyof typeof ChartTypes,
  data: IInputData,
  fields: FieldMapping
}

const ChartBuilder: FC<IChartBuilder> = ({ type, data, fields }) => {
  const ChartComponent = chartTypes[type]
  return (
    <ChartComponent data={data} fields={fields}/>
  )
}

export default ChartBuilder
