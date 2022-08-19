import { FC } from 'react'
import { DatasetImpl } from '../../ts/interfaces'
import { NullableIdentity } from '../../ts/types'
import DatasetList from '../DatasetList'

interface FieldPaneImpl {
  selectedChart?: NullableIdentity,
  datasets: DatasetImpl[]
}

const FieldPane: FC<FieldPaneImpl> = ({ selectedChart, datasets }) => {
  return (
    <div>
      <DatasetList selectedChart={selectedChart} datasets={datasets}/>
    </div>
  )
}

export default FieldPane
