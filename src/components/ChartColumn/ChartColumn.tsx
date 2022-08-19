import { useDrag } from 'react-dnd'
import { updateField } from '../../operations/store/field'
import { ColumnDropResultImpl, Identifiable } from '../../ts/interfaces'
import { DragTypeEnum } from '../../ts/enums'

import styles from './ChartColumn.module.scss'
import { FC } from 'react'

interface ChartColumnImpl extends Identifiable {
  name: string
}

const ChartColumn: FC<ChartColumnImpl> = ({ id, name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypeEnum.COLUMN,
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<ColumnDropResultImpl>()
      if (item && dropResult) {
        updateField({ type: dropResult.type }, id)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }))
  return (
    <div className={isDragging ? styles.ColumnDragging : ''} ref={drag}>{ name }</div>
  )
}

export default ChartColumn
