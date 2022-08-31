import { FC } from 'react'
import { useDrag } from 'react-dnd'
import { createField } from '../../operations/store/field'
import { DragTypeEnum } from '../../ts/enums'
import { ColumnDropResultImpl, ColumnImpl } from '../../ts/interfaces'
import { NullableIdentity } from '../../ts/types'
import styles from './DatasetColumn.module.scss'
interface DatasetColumnImpl extends ColumnImpl {
  active: boolean,
  selectedChart?: NullableIdentity
}

const DatasetColumn: FC<DatasetColumnImpl> = ({ id, selectedChart, name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypeEnum.COLUMN,
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<ColumnDropResultImpl>()
      if (item && dropResult && selectedChart) {
        createField(dropResult.type, selectedChart, item.id)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }), [selectedChart])
  return (
    <div ref={drag} className={`${styles.DatasetColumn}` + (isDragging ? ` ${styles.DatasetColumnActive}` : '')}>
      <div className={styles.DatasetColumnActive}>{name}</div>
    </div>
  )
}

export default DatasetColumn
