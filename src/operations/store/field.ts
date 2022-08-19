import { cache } from './../../apollo'
import { getNewId } from './utils'
import apollo from '../../apollo'
import { GET_FIELDS } from '../queries/getFields'
import { readColumn } from './column'
import { CrudEnum, FieldTypeEnum } from '../../ts/enums'
import { NullableIdentity } from '../../ts/types'
import { FieldImpl } from '../../ts/interfaces'
import { FIELD_FIELDS } from '../queries/fragments'

interface CreateFieldImpl {
  (type: keyof typeof FieldTypeEnum, chartId: NullableIdentity, columnId: NullableIdentity): void
}

interface ReadFieldImpl {
  (id: NullableIdentity): FieldImpl | null
}

interface FieldProps extends Partial<FieldImpl> {}

interface UpdateFieldImpl {
  (data: FieldProps, id: NullableIdentity): void
}

export const createField: CreateFieldImpl = (type, chartId, columnId) => {
  const column = readColumn(columnId)
  const { fields } = readFields({ chartId })
  apollo.writeQuery({
    query: GET_FIELDS,
    data: {
      fields: [
        ...fields,
        { __typename: 'Field', id: getNewId(), type, column, status: CrudEnum.CREATE }
      ]
    },
    variables: { chartId }
  })
}

export const readField: ReadFieldImpl = (id) => {
  return apollo.readFragment({
    id: cache.identify({ id, __typename: 'Field' }),
    fragmentName: 'FieldFields',
    fragment: FIELD_FIELDS
  })
}

export const readFields = (variables: { chartId: NullableIdentity }) => {
  return apollo.readQuery({
    query: GET_FIELDS,
    variables
  })
}

export const updateField: UpdateFieldImpl = (data, id) => {
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
