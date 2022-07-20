import { useQuery, gql } from '@apollo/client'

const GET_CHARTS = gql`
  query Charts($sheetId: Int!) {
    charts(sheet_id: $sheetId) {
      id
      type
      x
      y
    }
  }
`

const useCharts = (sheetId) => {
  const { loading, error, data } = useQuery(GET_CHARTS, { variables: { sheetId } })
  return { loading, error, data }
}

export default useCharts
