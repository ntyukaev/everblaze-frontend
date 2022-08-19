import apollo from '../../apollo'
import { GET_SHEETS } from '../queries/getSheets'
import { Identity, SheetProps } from '../../ts/types'

interface CreateSheetImpl {
  (data: SheetProps, variables: { reportId: Identity }): void
}

export const createSheet: CreateSheetImpl = (data, variables) => {
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

export const readSheets = (variables: { reportId: Identity }) => {
  return apollo.readQuery({
    query: GET_SHEETS,
    variables
  })
}
