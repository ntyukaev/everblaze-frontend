import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { GET_REPORT } from '../../operations/queries/getReport'
import styles from './DataLoader.module.scss'

const DataLoader = (Component:any) => function ReportLoader () {
  const params = useParams<{ reportId: string }>()
  // @ts-ignore: Object is possibly 'null'
  const reportId:number = +params.reportId
  const { error, loading, data } = useQuery(GET_REPORT, { variables: { reportId } })
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
