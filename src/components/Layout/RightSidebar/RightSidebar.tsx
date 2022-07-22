import { FC, ReactElement, useState } from 'react'
import { Typography } from 'antd'
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons'
import styles from './RightSidebar.module.scss'

const { Text } = Typography

export type RightSidebarType = {
  title: string,
  children: ReactElement | ReactElement[]
}

const RightSidebar: FC<RightSidebarType> = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true)

  const handleClick = () => {
    if (collapsed) {
      setCollapsed(false)
    } else {
      setCollapsed(true)
    }
  }

  return (
    <div className={`${styles.RightSidebar} ${collapsed && styles.collapsed}`}>
      <div onClick={handleClick} className={styles.RightSidebarHeading}>
        <div className={styles.RightSidebarTitle}>
          <Text strong={true}>{title}</Text>
        </div>
        <div className={styles.RightSidebarCollapseBtn}>
          {collapsed && <DoubleLeftOutlined className={styles.RightSidebarCollapseBtnIcon}/>}
          {!collapsed && <DoubleRightOutlined className={styles.RightSidebarCollapseBtnIcon}/>}
        </div>
      </div>
      <div className={styles.RightSidebarContents}>
        {!collapsed && children}
      </div>
    </div>
  )
}

export default RightSidebar
