import { GET_SHEETS } from './../queries/getSheets'
import apollo from '../../apollo'
import { NullableIdentity } from '../../types'

const readSheets = (variables: { reportId: NullableIdentity }) => {
  return apollo.readQuery({
    query: GET_SHEETS,
    variables
  })
}

export default readSheets
