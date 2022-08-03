import { gql } from '@apollo/client'

export const CELL_FIELDS = gql`
  fragment CellFields on Cell {
    id
    index
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
    width
    height
    status @client
  }
`

export const DATASET_FIELDS = gql`
  ${COLUMN_FIELDS}
  fragment DatasetFields on Dataset {
    id
    name
    columns {
      ...ColumnFields
    }
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
