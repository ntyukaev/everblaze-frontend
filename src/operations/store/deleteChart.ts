import { CHART_FIELDS } from './../queries/fragments'
import apollo, { cache } from '../../apollo'
import { CrudEnum, NullableIdentity } from './../../types/index'

const deleteChart = (id: NullableIdentity) => {
  apollo.writeFragment({
    id: cache.identify({ id, __typename: 'Chart' }),
    fragment: CHART_FIELDS,
    data: {
      status: CrudEnum.DELETE
    }
  })
}

export default deleteChart
