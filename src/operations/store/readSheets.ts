import { GET_SHEETS } from './../queries/getSheets'
import apollo from '../../apollo'
import { Identity } from '../../types'

const readSheets = (variables: { reportId: Identity }) => {
  return apollo.readQuery({
    query: GET_SHEETS,
    variables
  })
}

export default readSheets
