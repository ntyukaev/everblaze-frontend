import { useQuery } from '@apollo/client'
import { FC } from 'react'
import { GET_FIELDS } from '../../operations/queries/getFields'
import { FieldsData, FieldsVars, DatasetImpl } from '../../ts/interfaces'
import { NullableIdentity } from '../../ts/types'
import Dataset from '../Dataset/Dataset'

interface DatasetListImpl {
  datasets: DatasetImpl[],
  selectedChart?: NullableIdentity
}

const DatasetList:FC<DatasetListImpl> = ({ selectedChart, datasets }) => {
  const { error, loading, data } = useQuery<FieldsData, FieldsVars>(GET_FIELDS,
    { variables: { chartId: selectedChart || null }, skip: !selectedChart })
  if (error) {
    console.log(error)
    return (
      <div>An error occured</div>
    )
  }
  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  const usedColumnIds = data?.fields.map(field => field.column.id) || []
  return (
    <div>
      {datasets.map(dataset => <Dataset selectedChart={selectedChart} key={dataset.id} usedColumnIds={usedColumnIds} { ...dataset }/>)}
    </div>
  )
}

export default DatasetList
