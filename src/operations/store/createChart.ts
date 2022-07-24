import { NullableIdentity } from './../../types/index'
import { getNewId } from './utils'
import { GET_CHARTS } from './../queries/getCharts'
import apollo from '../../apollo'
import readCharts from './readCharts'
import { ChartProps, CrudEnum } from '../../types'
import { GET_FIELDS } from '../queries/getFields'

const createChart = (data: ChartProps, variables: { sheetId: NullableIdentity }) => {
  const { charts } = readCharts(variables)
  const chartId = getNewId()
  apollo.writeQuery({
    query: GET_CHARTS,
    data: {
      charts: [
        ...charts,
        { __typename: 'Chart', ...data, id: chartId, status: CrudEnum.CREATE }
      ]
    },
    variables
  })
  // also create empty array of fields for the new chart
  apollo.writeQuery({
    query: GET_FIELDS,
    data: {
      fields: []
    },
    variables: { chartId }
  })
}

export default createChart
