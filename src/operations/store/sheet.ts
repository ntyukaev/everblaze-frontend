import { getNewId } from './utils'
import apollo from '../../apollo'
import { GET_SHEETS } from '../queries/getSheets'
import { Identity } from '../../ts/types'
import { SheetImpl } from '../../ts/interfaces'

interface SheetParams extends Partial<SheetImpl> {}

interface CreateSheetImpl {
  (data: SheetParams, variables: { reportId: Identity }): void
}

export const createSheet: CreateSheetImpl = (data, variables) => {
  const { sheets } = readSheets(variables)
  apollo.writeQuery({
    query: GET_SHEETS,
    data: {
      sheets: [
        ...sheets,
        { __typename: 'Sheet', id: getNewId(), ...data }
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
