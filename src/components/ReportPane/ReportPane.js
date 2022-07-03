import ChartArea from '../ChartArea'
import RightSidebar from '../RightSidebar'
import TabList from '../TabList'
import styles from './ReportPane.module.scss'

const ReportPane = () => {
  return (
    <div className={styles.ReportPane}>
        <div className={styles.ReportPaneSplit}>
          <div className={styles.ReportPaneLeft}>
            <ChartArea/>
            <TabList/>
          </div>
          <RightSidebar className={styles.ReportPaneRight}/>
        </div>
      </div>
  )
}

export default ReportPane
