import { CHART_FIELDS } from './../queries/fragments'
import apollo, { cache } from '../../apollo'
import { CrudEnum, NullableIdentity } from './../../types/index'
import readChart from './readChart'

const updateChart = (data:{[key: string]: number | string | null}, id: NullableIdentity) => {
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

export default updateChart
