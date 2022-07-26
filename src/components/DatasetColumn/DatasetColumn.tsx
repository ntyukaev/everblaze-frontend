import { FC } from 'react'
import { useDrag } from 'react-dnd'
import { createField } from '../../operations/store'
import { ColumnDropResult, DragTypeEnum, IColumn, NullableIdentity } from '../../types'
import styles from './DatasetColumn.module.scss'
interface IDatasetColumn extends IColumn {
  active: boolean,
  selectedChart?: NullableIdentity
}

const DatasetColumn: FC<IDatasetColumn> = ({ id, selectedChart, name }) => {
  console.log(id)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypeEnum.COLUMN,
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<ColumnDropResult>()
      if (item && dropResult && selectedChart) {
        console.log(selectedChart)
        console.log(`You dropped ${item.id} into ${dropResult.type}!`)
        createField(dropResult.type, selectedChart, item.id)
        // updateField({ type: dropResult.type }, id)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }))
  return (
    <div ref={drag} className={`${styles.DatasetColumn}` + (isDragging ? ` ${styles.DatasetColumnActive}` : '')}>
      <div className={styles.DatasetColumnActive}>{name}</div>
    </div>
  )
}

export default DatasetColumn
