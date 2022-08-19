import { DatasetImpl } from './../../ts/interfaces'
import apollo, { cache } from '../../apollo'
import { NullableIdentity } from '../../ts/types'
import { DATASET_FIELDS } from '../queries/fragments'

interface ReadDatasetImpl {
  (id: NullableIdentity): DatasetImpl | null
}

export const readDataset: ReadDatasetImpl = (id) => {
  return apollo.readFragment({
    id: cache.identify({ id, __typename: 'Dataset' }),
    fragmentName: 'DatasetFields',
    fragment: DATASET_FIELDS
  })
}
