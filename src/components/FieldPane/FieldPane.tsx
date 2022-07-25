import { useQuery } from '@apollo/client'
import { FC } from 'react'
import { DatasetData, DatasetsVars, GET_DATASETS } from '../../operations/queries/getDatasets'
import { Identity, NullableIdentity } from '../../types'
import DatasetList from '../DatasetList'

interface IFieldPane {
  reportId: Identity,
  selectedChart: NullableIdentity
}

const FieldPane: FC<IFieldPane> = ({ reportId, selectedChart }) => {
  const { error, loading, data } = useQuery<DatasetData, DatasetsVars>(GET_DATASETS, { variables: { reportId } })
  if (error) {
    return (
      <div>An error occured</div>
    )
  }
  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <DatasetList selectedChart={selectedChart} datasets={data!.datasets}/>
    </div>
  )
}

export default FieldPane
