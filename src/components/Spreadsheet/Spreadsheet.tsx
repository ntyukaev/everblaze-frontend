import { HotTable } from '@handsontable/react'
import { FC } from 'react'
import { updateCell } from '../../operations/store/cell'
import { createColumn } from '../../operations/store/column'
import { readDataset } from '../../operations/store/dataset'
import { CellTypeEnum } from '../../ts/enums'
import { SelectableDataset, ColumnImpl } from '../../ts/interfaces'

interface SpreadsheetImpl extends SelectableDataset {}

const generateData = (columns:ColumnImpl[]) => {
  const result: any = Array.from({ length: columns[0].cells.length }, () => [])
  const ids: any = Array.from({ length: columns[0].cells.length }, () => [])
  const types: any = Array.from({ length: columns[0].cells.length }, () => [])
  columns.forEach((column) => {
    const columnIndex = column.index
    column.cells.forEach((cell) => {
      result[cell.index][columnIndex] = cell.value
      ids[cell.index][columnIndex] = cell.id
      types[cell.index][columnIndex] = cell.type
    })
  })
  return [result, ids, types]
}

const getColHeaders = (columns: ColumnImpl[]) => {
  return [...columns].sort((o1, o2) => o1.index > o2.index ? 1 : -1).map(col => col.name)
}

const Spreadsheet: FC<SpreadsheetImpl> = ({ selectedDataset }) => {
  if (!selectedDataset) {
    return null
  }
  const dataset = readDataset(selectedDataset)
  const [data, ids, types] = generateData(dataset!.columns)
  const colHeaders = getColHeaders(dataset!.columns)

  const hotSettings = {
    colHeaders,
    columnSorting: true,
    data,
    dropdownMenu: true,
    filters: true,
    height: 'auto',
    licenseKey: 'non-commercial-and-evaluation',
    width: '600px'
  }

  const handleBeforeChange = (changes:any) => {
    const [rowIndex, colIndex, prevVal, newVal] = changes[0]
    const type = types[rowIndex][colIndex]
    let coercedNewVal
    switch (type) {
      case CellTypeEnum.INT:
        coercedNewVal = parseInt(newVal)
        break
      case CellTypeEnum.FLOAT:
        coercedNewVal = parseFloat(newVal)
        break
      case CellTypeEnum.BOOLEAN:
        coercedNewVal = !!newVal
        break
      case CellTypeEnum.STRING:
        coercedNewVal = newVal
        break
      default:
        throw new Error('Not supported type.')
    }
    if (typeof (prevVal) === typeof (coercedNewVal)) {
      updateCell({ value: coercedNewVal }, ids[rowIndex][colIndex])
    } else {
      throw new Error('Column type and value type are not the same.')
    }
  }

  const handleAfterCreateCol = (index: number) => {
    createColumn({ index, name: 'test', type: CellTypeEnum.STRING }, selectedDataset, data.length)
  }

  return (
    <div>
      <HotTable
        beforeChange={handleBeforeChange}
        afterCreateCol={handleAfterCreateCol}
        settings={hotSettings}
        contextMenu={true}
      />
    </div>
  )
}

export default Spreadsheet
