import { gql } from '@apollo/client'

export const GET_SHEETS = gql`
  query Sheets($reportId: Int!) {
    sheets(report_id: $reportId) {
      id
      index
      name
    }
  }
`
