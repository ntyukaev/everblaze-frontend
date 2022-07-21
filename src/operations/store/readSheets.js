import { gql } from '@apollo/client'
import apollo from '../../apollo'

const READ_SHEETS = gql`
  query writeSheet($id: Int!) {
    sheets(report_id: $id) {
      id
      index
      name
    }
  }
`
const readSheets = (variables) => {
  return apollo.readQuery({
    query: READ_SHEETS,
    variables
  })
}

export default readSheets
