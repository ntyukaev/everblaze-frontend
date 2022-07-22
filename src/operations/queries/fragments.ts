import { gql } from '@apollo/client'

export enum CellTypes {
  INT,
  FLOAT,
  BOOLEAN,
  STRING
}

export interface Cell {
  id: number,
  type: keyof typeof CellTypes,
  value: any
}

export const CELL_FIELDS = gql`
  fragment CellFields on Cell {
    id
    type
    value
  }
`

export interface Column {
  id: number,
  name: string,
  index: number,
  type: keyof typeof CellTypes,
  cells: Cell[]
}

export const COLUMN_FIELDS = gql`
  ${CELL_FIELDS}
  fragment ColumnFields on Column {
    id
    index
    type
    name
    cells {
      ...CellFields
    }
  }
`
