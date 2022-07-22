import { gql } from '@apollo/client'

export interface Report {
  id: number,
  name: string,
  selectedSheet: number,
  selectedChart: number
}

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
