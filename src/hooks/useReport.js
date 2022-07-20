import { useQuery, gql } from '@apollo/client'

const useReport = (reportId) => {
  const GET_REPORT = gql`
    query Report($reportId: Int!) {
      report(id: $reportId) {
        id
        name
        selectedSheet @client
        selectedChart @client
      }
    }
  `
  const { loading, error, data } = useQuery(GET_REPORT, { variables: { reportId } })
  return { loading, error, data }
}

export default useReport
