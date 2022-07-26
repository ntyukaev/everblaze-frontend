import { HotTable } from '@handsontable/react'
import { FC } from 'react'
import { readDataset } from '../../operations/store'
import { IColumn, SelectableDataset } from '../../types'

interface ISpreadsheet extends SelectableDataset {}

const generateData = (columns:IColumn[]) => {
  const result: any = Array.from({ length: columns[0].cells.length }, () => [])
  columns.forEach((column) => {
    const columnIndex = column.index
    column.cells.forEach((cell) => {
      result[cell.index][columnIndex] = cell.value
    })
  })
  return result
}

const getColHeaders = (columns: IColumn[]) => {
  return [...columns].sort((o1, o2) => o1.index > o2.index ? 1 : -1).map(col => col.name)
}

const Spreadsheet: FC<ISpreadsheet> = ({ selectedDataset }) => {
  if (!selectedDataset) {
    return null
  }
  const dataset = readDataset(selectedDataset)
  const data = generateData(dataset.columns)
  const colHeaders = getColHeaders(dataset.columns)

  return (
    <div>
      <HotTable
        data={data}
        colHeaders={colHeaders}
        columnSorting={true}
        dropdownMenu={true}
        filters={true}
        width="600px"
        height="auto"
        licenseKey='non-commercial-and-evaluation'
      />
    </div>
  )
}

export default Spreadsheet
