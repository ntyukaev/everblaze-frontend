import { FC } from 'react'
import { DatasetImpl } from '../../ts/interfaces'
import { Identity, NullableIdentity } from '../../ts/types'
import DatasetColumn from '../DatasetColumn'

interface HasUsedColumns extends DatasetImpl {
  usedColumnIds: Identity[],
  selectedChart?: NullableIdentity
}

const Dataset: FC<HasUsedColumns> = ({ name, selectedChart, columns, usedColumnIds }) => {
  return (
    <div>
      <div>{name}</div>
      <div>
        { columns.map((column) => <DatasetColumn selectedChart={selectedChart} active={column.id in usedColumnIds} key={column.id} {...column}/>) }
      </div>
    </div>
  )
}

export default Dataset
