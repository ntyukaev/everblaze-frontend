import { NullableIdentity } from './../../types/index'
import apollo from '../../apollo'
import { GET_CHARTS } from '../queries/getCharts'

const readCharts = (variables: { sheetId: NullableIdentity }) => {
  return apollo.readQuery({
    query: GET_CHARTS,
    variables
  }
  )
}

export default readCharts
