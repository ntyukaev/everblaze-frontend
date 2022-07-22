import { gql } from '@apollo/client'
import apollo from '../../apollo'

const READ_SHEETS = gql`
  query writeSheet($report_id: Int!) {
    sheets(report_id: $report_id) {
      id
      index
      name
    }
  }
`
const readSheets = (variables: { reportId: number }) => {
  return apollo.readQuery({
    query: READ_SHEETS,
    variables
  })
}

export default readSheets
