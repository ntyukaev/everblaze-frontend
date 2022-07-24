import { gql } from '@apollo/client'
import { IField, NullableIdentity } from '../../types'
import { COLUMN_FIELDS } from './fragments'

export interface FieldsData {
  fields: IField[]
}

export interface FieldsVars {
  chartId: NullableIdentity
}

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
