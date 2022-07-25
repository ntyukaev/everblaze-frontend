import { FC } from 'react'
import { IDataset, Identity, NullableIdentity } from '../../types'
import DatasetColumn from '../DatasetColumn'

interface HasUsedColumns extends IDataset {
  usedColumnIds: Identity[],
  selectedChart: NullableIdentity
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
