import { FC } from 'react'
import { IDataset } from '../../types'
import ModelTable from '../ModelTable'
import styles from './ModelList.module.scss'

interface IModelList {
  datasets: IDataset[]
}

const ModelList: FC<IModelList> = ({ datasets }) => {
  console.log(datasets)
  return (
    <div className={styles.ModelList}>
      { datasets.map(dataset => <ModelTable {...dataset} key={dataset.id}/>) }
    </div>
  )
}

export default ModelList
