import { useQuery } from '@apollo/client'
import { FC } from 'react'
import { GET_FIELDS } from '../../operations/queries/getFields'
import { FieldsData, FieldsVars, SelectableChart } from '../../ts/interfaces'
import { readChart } from '../../operations/store/chart'
import ChartField from '../ChartField/ChartField'
import fieldTypes from './fieldTypes'

interface ChartFieldListImpl extends SelectableChart {}

const ChartFieldList: FC<ChartFieldListImpl> = ({ selectedChart }) => {
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
