import { useDrag } from 'react-dnd'
import updateField from '../../operations/store/updateField'
import { ColumnDropResult, DragTypeEnum, Identity } from '../../types'
import styles from './ChartColumn.module.scss'

const ChartColumn = ({ id, name }: { name: string, id: Identity }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypeEnum.COLUMN,
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<ColumnDropResult>()
      if (item && dropResult) {
        // console.log(`You dropped ${item.id} into ${dropResult.type}!`)
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
