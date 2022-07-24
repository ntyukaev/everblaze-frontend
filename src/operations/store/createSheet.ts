import { Identity, SheetProps } from '../../types/index'
import apollo from '../../apollo'
import readSheets from './readSheets'
import { GET_SHEETS } from '../queries/getSheets'

const createSheet = (data: SheetProps, variables: { reportId: Identity }) => {
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

export default createSheet
