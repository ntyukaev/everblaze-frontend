import { useQuery } from '@apollo/client'
import { FC } from 'react'
import { DatasetData, DatasetsVars, GET_DATASETS } from '../../operations/queries/getDatasets'
import { Identity } from '../../types'
import DatasetSection from '../DatasetSection'

interface IFieldPane {
  reportId: Identity
}

const FieldPane: FC<IFieldPane> = ({ reportId }) => {
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
      { data!.datasets.map((dataset) => <DatasetSection key={dataset.id} {...dataset} />) }
    </div>
  )
}

export default FieldPane
