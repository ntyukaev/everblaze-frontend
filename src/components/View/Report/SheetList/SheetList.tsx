import { FC } from 'react'
import { Button } from 'antd'
import { Sheet } from '../../../../operations/queries/getSheets'
import styles from './SheetList.module.scss'

type SheetListType = {
  sheets: Sheet[],
  selectedSheet: number
}

const SheetList: FC<SheetListType> = ({ sheets, selectedSheet }) => {
  return (
    <div className={styles.SheetList}>
      {sheets.map((sheet) => <Button type='text' key={sheet.index}
        className={selectedSheet === sheet.id && styles.SheetActive}>{sheet.name}</Button>)}
    </div>
  )
}

export default SheetList
