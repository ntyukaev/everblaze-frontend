import { ISheet, NullableIdentity } from './../../types/index'
import { gql } from '@apollo/client'

export interface SheetsData {
  sheets: ISheet[]
}

export interface SheetsVars {
  reportId: NullableIdentity
}

export const GET_SHEETS = gql`
  query Sheets($reportId: Int!) {
    sheets(report_id: $reportId) {
      id
      index
      name
    }
  }
`
