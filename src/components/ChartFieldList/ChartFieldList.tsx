import { useQuery } from '@apollo/client'
import { FC } from 'react'
import { FieldsData, FieldsVars, GET_FIELDS } from '../../operations/queries/getFields'
import { readChart } from '../../operations/store'
import { SelectableChart } from '../../types'
import ChartField from '../ChartField/ChartField'
import fieldTypes from './fieldTypes'

interface IChartFieldList extends SelectableChart {}

const ChartFieldList: FC<IChartFieldList> = ({ selectedChart }) => {
  const chart = readChart(selectedChart)
  const { error, loading, data } = useQuery<FieldsData, FieldsVars>(GET_FIELDS, { variables: { chartId: selectedChart } })
  if (error) {
    return (
      <div>Error occured</div>
    )
  }
  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
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
