import { CellTypeEnum } from './../../ts/enums'
import { getNewId } from './utils'
import { ColumnImpl } from './../../ts/interfaces'
import apollo, { cache } from '../../apollo'
import { NullableIdentity } from '../../ts/types'
import { COLUMN_FIELDS } from '../queries/fragments'
import { createCell } from './cell'

interface ReadColumnImpl {
  (id: NullableIdentity): ColumnImpl | null
}

export const readColumn: ReadColumnImpl = (id) => {
  return apollo.readFragment({
    id: cache.identify({ id, __typename: 'Column' }),
    fragmentName: 'ColumnFields',
    fragment: COLUMN_FIELDS
  })
}

export const createColumn = (data: {index: number, name: string, type: CellTypeEnum}, datasetId: NullableIdentity, numCells: number) => {
  const cellIds: string[] = []
  Array(numCells).fill(0).forEach((_, index) => {
    const cellId = createCell({ type: data.type, index, value: '' })
    cellIds.push(cellId)
  })
  const id = getNewId()
  const columnId = `Column:${id}`
  const cellRefs = cellIds.map((cId) => {
    return { __ref: cId }
  })

  apollo.writeFragment({
    id: columnId,
    fragmentName: 'ColumnFields',
    fragment: COLUMN_FIELDS,
    data: {
      id: columnId,
      __typename: 'Column',
      ...data,
      cells: []
    }
  })

  cache.modify({
    id: columnId,
    fields: {
      cells (oldCells) {
        return [
          ...oldCells,
          ...cellRefs
        ]
      }
    }
  })

  cache.modify({
    id: cache.identify({ id: datasetId, __typename: 'Dataset' }),
    fields: {
      columns (oldColumns) {
        return [
          ...oldColumns,
          { __ref: columnId }
        ]
      }
    }
  })
}
