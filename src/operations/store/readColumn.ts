import apollo, { cache } from '../../apollo'
import { COLUMN_FIELDS } from '../queries/fragments'
import { NullableIdentity } from './../../types/index'

const readColumn = (id: NullableIdentity) => {
  return apollo.readFragment({
    id: cache.identify({ id, __typename: 'Column' }),
    fragmentName: 'ColumnFields',
    fragment: COLUMN_FIELDS
  })
}

export default readColumn
