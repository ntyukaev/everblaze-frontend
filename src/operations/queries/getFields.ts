import { gql } from '@apollo/client'
import { FIELD_FIELDS } from './fragments'

export const GET_FIELDS = gql`
  ${FIELD_FIELDS}
  query Fields($chartId: Int!) {
    fields(chart_id: $chartId) {
      ...FieldFields
    }
  }
`
