import { gql } from '@apollo/client'
import apollo from '../apollo'
import readSheets from './readSheets'

const WRITE_SHEET = gql`
  query writeSheet($id: Int!) {
    sheets(report_id: $id) {
      id
      index
      name
    }
  }
`

const writeSheet = (data, variables) => {
  const { sheets } = readSheets(variables)
  apollo.writeQuery({
    query: WRITE_SHEET,
    data: {
      sheets: [
        ...sheets,
        { __typename: 'Sheet', ...data }
      ]
    },
    variables
  })
}

export default writeSheet
