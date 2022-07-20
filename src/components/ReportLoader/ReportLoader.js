import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { useReport } from '../../hooks'
import styles from './ReportLoader.module.scss'

const ReportLoader = (Component) => function ReportLoader () {
  const { reportId } = useParams()
  const { error, loading, data } = useReport(+reportId)
  if (error) {
    return (
      <div>An Error Occured</div>
    )
  }
  if (loading) {
    return (
      <div className={styles.ReportLoaderSpinner}>
        <Spin />
      </div>
    )
  }
  return (
    <Component {...data.report} />
  )
}

export default ReportLoader
