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
        sheets {
          index,
          name
        }
      }
    }
  `
  const { loading, error, data } = useQuery(GET_SHEETS, { variables: { reportId } })
  return { loading, error, data }
}

export const useCharts = (reportId, sheetIndex) => {
  const GET_CHARTS = gql`
    query Charts($reportId: Int!, $sheetIndex: Int!) {
      sheet(report_id: $reportId, index: $sheetIndex) {
        charts {
          x,
          y,
          type,
          fields {
            id,
            type,
            column {
              id,
              name,
              cells {
                value
              }
            }
          }
        }
      }
    }
  `
  const { loading, error, data } = useQuery(GET_CHARTS, { variables: { reportId, sheetIndex } })
  return { loading, error, data }
}
