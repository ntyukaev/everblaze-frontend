import { FC } from 'react'
import { DatasetImpl } from '../../ts/interfaces'
import ModelTable from '../ModelTable'
import styles from './ModelList.module.scss'

interface ModelListImpl {
  datasets: DatasetImpl[]
}

const ModelList: FC<ModelListImpl> = ({ datasets }) => {
  console.log(datasets)
  return (
    <div className={styles.ModelList}>
      { datasets.map(dataset => <ModelTable {...dataset} key={dataset.id}/>) }
    </div>
  )
}

export default ModelList
