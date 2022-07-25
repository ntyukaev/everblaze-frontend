import { FIELD_FIELDS } from './../queries/fragments'
import apollo, { cache } from '../../apollo'
import { IField, NullableIdentity } from './../../types'

const readField = (id: NullableIdentity): IField | null => {
  return apollo.readFragment({
    id: cache.identify({ id, __typename: 'Field' }),
    fragmentName: 'FieldFields',
    fragment: FIELD_FIELDS
  })
}

export default readField
