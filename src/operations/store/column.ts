import { ColumnImpl } from './../../ts/interfaces'
import apollo, { cache } from '../../apollo'
import { NullableIdentity } from '../../ts/types'
import { COLUMN_FIELDS } from '../queries/fragments'

interface ReadColumnImpl {
  (id: NullableIdentity): ColumnImpl | null
}

export const readColumn: ReadColumnImpl = (id) => {
  return apollo.readFragment({
    id: cache.identify({ id, __typename: 'Column' }),
    fragmentName: 'ColumnFields',
    fragment: COLUMN_FIELDS
  })
}
