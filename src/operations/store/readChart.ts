import { CHART_FIELDS } from './../queries/fragments'
import apollo, { cache } from '../../apollo'
import { IChart, NullableIdentity } from './../../types/index'

const readChart = (id: NullableIdentity): IChart | null => {
  return apollo.readFragment({
    id: cache.identify({ id, __typename: 'Chart' }),
    fragment: CHART_FIELDS
  })
}

export default readChart
