import { FC } from 'react'
import { Button } from 'antd'
import styles from './SheetList.module.scss'
import { SheetImpl, SelectableSheet } from '../../ts/interfaces'

interface SheetListImpl extends SelectableSheet {
  sheets: SheetImpl[]
}

const SheetList: FC<SheetListImpl> = ({ sheets, selectedSheet }) => {
  return (
    <div className={styles.SheetList}>
      {sheets.map((sheet) => <Button type='text' key={sheet.index}
        className={selectedSheet === sheet.id && styles.SheetActive}>{sheet.name}</Button>)}
    </div>
  )
}

export default SheetList
