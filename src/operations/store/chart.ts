import { getNewId } from './utils'
import { GET_CHARTS } from './../queries/getCharts'
import apollo, { cache } from '../../apollo'
import { GET_FIELDS } from '../queries/getFields'
import { ChartProps, NullableIdentity } from '../../ts/types'
import { CrudEnum } from '../../ts/enums'
import { ChartImpl } from '../../ts/interfaces'
import { CHART_FIELDS } from '../queries/fragments'

interface CreateChartImpl {
  (data: ChartProps, variables: { sheetId: NullableIdentity }): void
}

interface ChartParams extends Partial<ChartImpl> {}

interface UpdateChartImpl {
  (data: ChartParams, id: NullableIdentity): void
}

interface ReadChartImpl {
  (id: NullableIdentity): ChartImpl | null
}

export const createChart: CreateChartImpl = (data, variables) => {
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

export const readChart: ReadChartImpl = (id) => {
  return apollo.readFragment({
    id: cache.identify({ id, __typename: 'Chart' }),
    fragment: CHART_FIELDS
  })
}

export const readCharts = (variables: { sheetId: NullableIdentity }) => {
  return apollo.readQuery({
    query: GET_CHARTS,
    variables
  })
}

export const updateChart: UpdateChartImpl = (data, id) => {
  const existing = readChart(id)
  apollo.writeFragment({
    id: cache.identify({ id, __typename: 'Chart' }),
    fragment: CHART_FIELDS,
    data: {
      ...existing,
      ...data,
      status: CrudEnum.UPDATE
    }
  })
}

interface DeleteChartImpl {
  (id: NullableIdentity): void
}

export const deleteChart: DeleteChartImpl = (id) => {
  const existing = readChart(id)
  apollo.writeFragment({
    id: cache.identify({ id, __typename: 'Chart' }),
    fragment: CHART_FIELDS,
    data: {
      ...existing,
      status: CrudEnum.DELETE
    }
  })
}
