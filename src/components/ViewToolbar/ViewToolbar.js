import { Button } from 'antd'
import { BarChartOutlined, TableOutlined, ClusterOutlined } from '@ant-design/icons'
import styles from './ViewToolbar.module.scss'

const ViewToolbar = () => {
  return (
    <div className={styles.ViewToolbar}>
      <div className={styles.ViewList}>
        <Button type='text' icon={<BarChartOutlined/>} block />
        <Button type='text' icon={<TableOutlined/>} block />
        <Button type='text' icon={<ClusterOutlined/>} block />
      </div>
    </div>
  )
}

export default ViewToolbar
