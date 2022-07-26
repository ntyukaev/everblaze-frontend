import { FC } from 'react'
import { IDataset, NullableIdentity } from '../../types'
import DatasetList from '../DatasetList'

interface IFieldPane {
  selectedChart?: NullableIdentity,
  datasets: IDataset[]
}

const FieldPane: FC<IFieldPane> = ({ selectedChart, datasets }) => {
  return (
    <div>
      <DatasetList selectedChart={selectedChart} datasets={datasets}/>
    </div>
  )
}

export default FieldPane
