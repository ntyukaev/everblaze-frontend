import { gql } from '@apollo/client'

import { COLUMN_FIELDS } from './fragments'

export const GET_FIELDS = gql`
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
