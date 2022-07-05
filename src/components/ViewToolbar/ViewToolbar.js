import { NavLink } from 'react-router-dom'
import { Button } from 'antd'
import { BarChartOutlined, TableOutlined, ClusterOutlined } from '@ant-design/icons'
import styles from './ViewToolbar.module.scss'

const ViewToolbar = () => {
  const viewList = [
    [BarChartOutlined, '/report'],
    [TableOutlined, '/data'],
    [ClusterOutlined, '/model']
  ]
  return (
    <div className={styles.ViewToolbar}>
      <div className={styles.ViewList}>
        {
          viewList.map(([Icon, url]) => (
            <NavLink to={url} key={url} className={({ isActive }) => `${styles.NavLink} ${(isActive ? `${styles.Active}` : '')}`}>
              <Button type='text' icon={<Icon/>} block />
            </NavLink>
          ))
        }
      </div>
    </div>
  )
}

export default ViewToolbar
