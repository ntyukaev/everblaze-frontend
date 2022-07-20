import { useQuery, gql } from '@apollo/client'

const useSheets = (reportId) => {
  const GET_SHEETS = gql`
    query Sheets($reportId: Int!) {
      sheets(report_id: $reportId) {
        id
        index
        name
      }
    }
  `
  const { loading, error, data } = useQuery(GET_SHEETS, { variables: { reportId } })
  return { loading, error, data }
}

export default useSheets
