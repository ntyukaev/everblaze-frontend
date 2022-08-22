import { FC } from 'react'
import styles from './SheetList.module.scss'
import { SheetImpl, SelectableSheet } from '../../ts/interfaces'
import SheetButton from '../SheetButton'
import { Identity } from '../../ts/types'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { createSheet } from '../../operations/store/sheet'

interface SheetListImpl extends SelectableSheet {
  sheets: SheetImpl[],
  reportId: Identity
}

const SheetList: FC<SheetListImpl> = ({ sheets, selectedSheet, reportId }) => {
  const handleClick = () => {
    createSheet({ name: `New Sheet ${sheets.length + 1}`, index: sheets.length }, { reportId })
  }
  return (
    <div className={styles.SheetList}>
      { sheets.map((sheet) => <SheetButton reportId={reportId}
        id={sheet.id}
        name={sheet.name}
        key={sheet.index}
        active={selectedSheet === sheet.id}/>) }
      <div onClick={handleClick} className={styles.SheetListAddSheet}>
        <Button type='text'><PlusOutlined /></Button>
      </div>
    </div>
  )
}

export default SheetList
