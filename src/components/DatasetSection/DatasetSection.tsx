import { FC } from 'react'
import { IDataset } from '../../types'

const DatasetSection: FC<IDataset> = ({ name, columns }) => {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {columns.map((column) => <li key={column.id}>{column.name}</li>)}
      </ul>
    </div>
  )
}

export default DatasetSection
