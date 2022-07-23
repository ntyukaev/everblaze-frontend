import { gql } from '@apollo/client'
import { ColumnProps } from '../../types'
import { COLUMN_FIELDS } from './fragments'

export enum FieldTypes {
  X,
  Y
}
export interface Field {
  id: number,
  type: keyof typeof FieldTypes,
  column: ColumnProps
}

export interface FieldsData {
  fields: Field[]
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
