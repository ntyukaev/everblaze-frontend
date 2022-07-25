import apollo, { cache } from '../../apollo'
import { FIELD_FIELDS } from '../queries/fragments'
import { CrudEnum, NullableIdentity } from './../../types/index'
import readField from './readField'

const updateField = (data:{[key: string]: number | string | null}, id: NullableIdentity) => {
  const existing = readField(id)
  apollo.writeFragment({
    id: cache.identify({ id, __typename: 'Field' }),
    fragmentName: 'FieldFields',
    fragment: FIELD_FIELDS,
    data: {
      ...existing,
      ...data,
      status: CrudEnum.UPDATE
    }
  })
}

export default updateField
