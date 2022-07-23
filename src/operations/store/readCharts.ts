import apollo from '../../apollo'
import { GET_CHARTS } from '../queries/getCharts'

const readCharts = (variables: { sheetId: number | null }) => {
  return apollo.readQuery({
    query: GET_CHARTS,
    variables
  }
  )
}

export default readCharts
