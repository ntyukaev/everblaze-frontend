import { getNewId } from './utils'
import apollo from '../../apollo'
import { CrudEnum, FieldTypeEnum, NullableIdentity } from './../../types/index'
import readFields from './readFields'
import { GET_FIELDS } from '../queries/getFields'
import readColumn from './readColumn'

const createField = (type: keyof typeof FieldTypeEnum, chartId: NullableIdentity, columnId: NullableIdentity) => {
  console.log(type)
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

export default createField
