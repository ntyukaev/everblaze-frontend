import { FC } from 'react'
import { Button } from 'antd'
import styles from './SheetList.module.scss'
import { ISheet, SelectableSheet } from '../../types'

interface ISheetList extends SelectableSheet {
  sheets: ISheet[]
}

const SheetList: FC<ISheetList> = ({ sheets, selectedSheet }) => {
  return (
    <div className={styles.SheetList}>
      {sheets.map((sheet) => <Button type='text' key={sheet.index}
        className={selectedSheet === sheet.id && styles.SheetActive}>{sheet.name}</Button>)}
    </div>
  )
}

export default SheetList
