import apollo from '../../apollo'
import readSheets from './readSheets'
import { Sheet, GET_SHEETS } from '../queries/getSheets'

const writeSheet = (data: Sheet, variables: { reportId: number }) => {
  const { sheets } = readSheets(variables)
  apollo.writeQuery({
    query: GET_SHEETS,
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
