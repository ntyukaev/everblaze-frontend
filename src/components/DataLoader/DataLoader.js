import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { useReport } from '../../hooks'
import styles from './DataLoader.module.scss'

const DataLoader = (Component) => function ReportLoader () {
  const { reportId } = useParams()
  const { error, loading, data } = useReport(+reportId)
  if (error) {
    return (
      <div>An Error Occured</div>
    )
  }
  if (loading) {
    return (
      <div className={styles.DataLoaderSpinner}>
        <Spin />
      </div>
    )
  }
  return (
    <Component {...data.report} />
  )
}

export default DataLoader
