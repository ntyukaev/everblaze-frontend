import { useQuery, gql } from '@apollo/client'

const CELL_FIELDS = gql`
  fragment CellFields on Cell {
    id
    type
    value
  }
`

const COLUMN_FIELDS = gql`
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

const GET_FIELDS = gql`
  ${COLUMN_FIELDS}
  query Fields($chartId: Int!) {
    fields(chart_id: $chartId) {
      id
      type
      column {
        ...ColumnFields
      }
    }
  }
`

const useFields = (chartId) => {
  const { loading, error, data } = useQuery(GET_FIELDS, { variables: { chartId } })
  return { loading, error, data }
}

export default useFields
