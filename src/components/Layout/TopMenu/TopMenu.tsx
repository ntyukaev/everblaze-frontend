import { FC } from 'react'
import styles from './TopMenu.module.scss'

interface ITopMenu {
  reportName?: string
}

const TopMenu: FC<ITopMenu> = ({ reportName }) => {
  return (
    <div className={styles.TopMenu}>{reportName}</div>
  )
}

export default TopMenu
