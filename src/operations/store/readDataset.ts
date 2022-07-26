import apollo, { cache } from '../../apollo'
import { NullableIdentity } from '../../types'
import { DATASET_FIELDS } from '../queries/fragments'

const readDataset = (id:NullableIdentity) => {
  return apollo.readFragment({
    id: cache.identify({ id, __typename: 'Dataset' }),
    fragmentName: 'DatasetFields',
    fragment: DATASET_FIELDS
  })
}

export default readDataset
