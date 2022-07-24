import { FC } from 'react'
import { readChart, readFields } from '../../operations/store'
import { SelectableChart } from '../../types'
import ChartField from '../ChartField/ChartField'
import fieldTypes from './fieldTypes'

interface IChartFieldList extends SelectableChart {}

const ChartFieldList: FC<IChartFieldList> = ({ selectedChart }) => {
  const chart = readChart(selectedChart)
  const data = readFields({ chartId: selectedChart })
  console.log(chart)
  console.log(selectedChart)
  return (
    <div>
      {fieldTypes[chart!.type].map((type) => {
        return <ChartField key={type} type={type}
          fields={data!.fields.filter(field => field.type === type)}/>
      })}
    </div>
  )
}

export default ChartFieldList
