import { FC, ReactElement } from 'react'
import styles from './TabList.module.scss'

type TabListType = {
  children: ReactElement
}

const TabList: FC<TabListType> = ({ children }) => {
  return (
    <div className={styles.TabList}>{ children }</div>
  )
}

export default TabList
