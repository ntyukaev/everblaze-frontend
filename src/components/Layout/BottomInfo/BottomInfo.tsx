import { FC, ReactNode } from 'react'
import styles from './BottomInfo.module.scss'

type BottomInfoType = {
  children?: ReactNode
}

const BottomInfo: FC<BottomInfoType> = ({ children }) => {
  return (
    <div className={styles.BottomInfo}>
      { children }
    </div>
  )
}

export default BottomInfo
