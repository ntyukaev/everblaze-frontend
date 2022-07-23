import { gql } from '@apollo/client'
import { IField } from '../../types'
import { COLUMN_FIELDS } from './fragments'

export interface FieldsData {
  fields: IField[]
}

export interface FieldsVars {
  chartId: number
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
