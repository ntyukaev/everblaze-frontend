import { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'antd'
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons'
import styles from './RightSidebar.module.scss'

const { Text } = Typography

const RightSidebar = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(false)

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
        {children}
      </div>
    </div>
  )
}

RightSidebar.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string
}

export default RightSidebar
