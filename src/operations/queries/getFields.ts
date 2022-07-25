import { NullableIdentity } from './../../types/index'
import { gql } from '@apollo/client'
import { IField } from '../../types'
import { FIELD_FIELDS } from './fragments'

export interface FieldsData {
  fields: IField[]
}

export interface FieldsVars {
  chartId: NullableIdentity
}

export const GET_FIELDS = gql`
  ${FIELD_FIELDS}
  query Fields($chartId: Int!) {
    fields(chart_id: $chartId) {
      ...FieldFields
    }
  }
`
