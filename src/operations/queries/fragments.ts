import { gql } from '@apollo/client'

export const CELL_FIELDS = gql`
  fragment CellFields on Cell {
    id
    type
    value
  }
`

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

export const CHART_FIELDS = gql`
  fragment ChartFields on Chart {
    id
    type
    x
    y
    status @client
  }
`

export const FIELD_FIELDS = gql`
  ${COLUMN_FIELDS}
  fragment FieldFields on Field {
    id
    type
    column {
      ...ColumnFields
    }
  }
`
