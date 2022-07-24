import { FieldsData, GET_FIELDS } from './../queries/getFields'
import { NullableIdentity } from './../../types/index'
import apollo from '../../apollo'

const readFields = (variables: { chartId: NullableIdentity }): FieldsData | null => {
  return apollo.readQuery({
    query: GET_FIELDS,
    variables
  }
  )
}

export default readFields
