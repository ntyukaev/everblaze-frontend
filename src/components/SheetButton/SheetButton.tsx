import { FC } from 'react'
import { Button } from 'antd'
import styles from './SheetButton.module.scss'
import { Identity } from '../../ts/types'
import { updateReport } from '../../operations/store/report'

interface SheetButtonImpl {
  id: Identity,
  name: string,
  active: boolean,
  reportId: Identity
}

const SheetButton: FC<SheetButtonImpl> = ({ active, id, name, reportId }) => {
  const handleClick = () => {
    updateReport({ selectedSheet: id }, { reportId })
  }

  return (
    <div onClick={handleClick} className={`${styles.SheetButton}` + (active ? ` ${styles.SheetButtonActive}` : '')}>
      <Button className={styles.SheetButtonInner} type='text'>{ name }</Button>
    </div>
  )
}

export default SheetButton
