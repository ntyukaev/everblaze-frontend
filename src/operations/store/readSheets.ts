import { GET_SHEETS } from './../queries/getSheets'
import apollo from '../../apollo'

const readSheets = (variables: { reportId: number }) => {
  return apollo.readQuery({
    query: GET_SHEETS,
    variables
  })
}

export default readSheets
