import { CellProps } from '../../../../types'
import { Field } from './../../../../operations/queries/getFields'

export const getColumnNames = (fields: Field[]): string[] => {
  const count: { [name: string]: number } = {}
  return fields.map((field) => {
    let name = field.column.name
    if (name in count) {
      name = `${name} (${count[name]})`
      count[name] += 1
    } else {
      count[name] = 1
    }
    return name
  })
}

export const fieldsSameLength = (fields: Field[]): boolean => {
  const fieldLengths = fields.map((field) => field.column.cells.length)
  return fieldLengths.every((f) => fieldLengths[0] === f)
}

export type IInputData = Array<Record<string, any>>

// {[cellIndex: number]: Record<string, any>}
export const getInputData = (fields: Field[], columnNames: string[]): IInputData => {
  const data: Record<string, any>[] = Array.from({ length: fields[0].column.cells.length }, () => { return {} })
  return fields.reduce((acc: IInputData, cur: Field, fieldIndex:number) => {
    cur.column.cells.forEach((cell: CellProps, cellIndex: number) => {
      const columnName = columnNames[fieldIndex]
      acc[cellIndex][columnName] = cell.value
    })
    return acc
  }, data)
}

export type FieldMapping = {[type:string]: string[]}

export const getFieldMapping = (fields: Field[], columnNames: string[]): FieldMapping => {
  return fields.reduce((acc:FieldMapping, cur, fieldIndex) => {
    const { type } = cur
    if (!acc[type]) {
      acc[type] = []
    }
    const columnName = columnNames[fieldIndex]
    acc[type].push(columnName)
    return acc
  }, {})
}
