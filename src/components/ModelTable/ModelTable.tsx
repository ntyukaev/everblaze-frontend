import { FC } from 'react'
import { Rnd } from 'react-rnd'
import { DatasetImpl } from '../../ts/interfaces'
import styles from './ModelTable.module.scss'

const ModelTable: FC<DatasetImpl> = ({ name, columns }) => {
  return (
    <Rnd
    bounds='parent'
    className={styles.ModelTable}
    size={{ width: '20%', height: '50%' }}>
      <div>Name: {name}</div>
      {columns.map(col => <div key={col.id}>{col.name}</div>)}
    </Rnd>
  )
}

export default ModelTable
