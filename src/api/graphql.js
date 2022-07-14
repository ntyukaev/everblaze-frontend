import { useQuery, gql } from '@apollo/client'

export const GRAPHQL_ENDPOINT = 'http://localhost:8000/graphql'

export const useReport = (reportId) => {
  const GET_REPORT = gql`
    {
      query ReportName($reportId: Int!) {
        report(id: $reportId) {
          name
        }
      }
    }
  `
  const { loading, error, data } = useQuery(GET_REPORT, { variables: { reportId } })
  return { loading, error, data }
}

export const useSheets = (reportId) => {
  const GET_SHEETS = gql`
    query SheetIndexAndName($reportId: Int!) {
      report(id: $reportId) {
        sheet {
          index,
          name
        }
      }
    }
  `
  const { loading, error, data } = useQuery(GET_SHEETS, { variables: { reportId } })
  return { loading, error, data }
}
