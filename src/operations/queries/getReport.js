import { gql } from '@apollo/client'

export const GET_REPORT = gql`
  query Report($reportId: Int!) {
    report(id: $reportId) {
      id
      name
      selectedSheet @client
      selectedChart @client
    }
  }
`
