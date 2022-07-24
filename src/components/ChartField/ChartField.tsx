import { FC } from 'react'
import { FieldTypeEnum, IField } from '../../types'
import Column from '../Column'

type IChartField = {
  fields: IField[],
  type: keyof typeof FieldTypeEnum
}

const ChartField: FC<IChartField> = ({ type, fields }) => {
  console.log(type)
  console.log(fields)
  return (
    <div>
      <div>{type}</div>
      <div>
        {fields.map((field) => <Column key={field.column.name} name={field.column.name} />)}
      </div>
    </div>
  )
}

export default ChartField
