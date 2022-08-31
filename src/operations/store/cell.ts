import { CellTypeEnum } from './../../ts/enums'
import { getNewId } from './utils'
import { cache } from './../../apollo'
import apollo from '../../apollo'
import { NullableIdentity } from '../../ts/types'
import { CELL_FIELDS } from '../queries/fragments'
import { CellImpl } from '../../ts/interfaces'
import { CrudEnum } from '../../ts/enums'

interface ReadCellImpl {
  (id: NullableIdentity): CellImpl | null
}

interface CellProps extends Partial<CellImpl> {}

interface UpdateCellImpl {
  (data: CellProps, id: NullableIdentity): void
}

export const readCell: ReadCellImpl = (id: NullableIdentity) => {
  return apollo.readFragment({
    id: cache.identify({ id, __typename: 'Cell' }),
    fragment: CELL_FIELDS
  })
}

export const updateCell: UpdateCellImpl = (data, id) => {
  const existing = readCell(id)
  apollo.writeFragment({
    id: cache.identify({ id, __typename: 'Cell' }),
    fragment: CELL_FIELDS,
    data: {
      ...existing,
      ...data,
      status: CrudEnum.UPDATE
    }
  })
}

export const createCell = (data: {index: number, type: CellTypeEnum, value: string | number | null}) => {
  const id = getNewId()
  const cellId = `Cell:${id}`
  console.log(cellId)
  apollo.writeFragment({
    id: cellId,
    fragment: CELL_FIELDS,
    data: {
      id: cellId,
      __typename: 'Cell',
      ...data
    }
  })
  return cellId
}
