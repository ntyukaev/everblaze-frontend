import apollo from '../../apollo'
import readSheets from './readSheets'
import { GET_SHEETS } from '../queries/getSheets'

const writeSheet = (data, variables) => {
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
