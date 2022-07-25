import { FC } from 'react'
import { useDrop } from 'react-dnd'
import { DragTypeEnum, FieldTypeEnum, IField } from '../../types'
import ChartColumn from '../ChartColumn'
import styles from './ChartField.module.scss'

type IChartField = {
  fields: IField[],
  type: keyof typeof FieldTypeEnum
}

const ChartField: FC<IChartField> = ({ type, fields }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DragTypeEnum.COLUMN,
    drop: () => ({ type }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))
  const isActive = canDrop && isOver
  return (
    <div className={canDrop ? styles.ChartFieldCanDrop : ''}>
      <div>{type}</div>
      <div ref={drop} className={`${styles.ChartField}` + (isActive ? ` ${styles.ChartFieldActive}` : '')}>
        {fields.map((field) => <ChartColumn id={field.id} key={field.id} name={field.column.name} />)}
      </div>
    </div>
  )
}

export default ChartField
