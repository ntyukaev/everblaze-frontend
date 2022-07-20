import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import { selectedSheetsVar } from '../../../../apollo'
import { writeSheet } from '../../../../operations'
import { useSheets } from '../../../../hooks'
import ReportSidebar from '../ReportSidebar'
import { Playground, TabList } from '../../../Layout'
import SheetList from '../SheetList'
import ReportArea from '../ReportArea'
import styles from './ReportPlayground.module.scss'

const ReportPlayground = ({ reportId, selectedSheet }) => {
  const { error, loading, data } = useSheets(+reportId)
  useEffect(() => {
    if (!selectedSheet) {
      if (data?.sheets) {
        if (data.sheets.length > 0) {
          selectedSheetsVar({
            ...selectedSheetsVar(),
            [reportId]: data.sheets[0].id
          })
        } else {
          writeSheet({ index: 0, id: 10003, name: 'New Sheet' }, { id: reportId })
        }
      }
    }
  }, [data, selectedSheet])

  if (error) {
    return (
      <div>An error occured</div>
    )
  }
  if (loading || !selectedSheet) {
    return (
      <div className={styles.ReportPlaygroundSpinner}>
        <Spin />
      </div>
    )
  }
  return (
    <Playground sidebar={<ReportSidebar />}>
      <ReportArea selectedSheet={selectedSheet} />
      <TabList>
        <SheetList selectedSheet={selectedSheet} sheets={data.sheets} />
      </TabList>
    </Playground>
  )
}

ReportPlayground.propTypes = {
  reportId: PropTypes.number,
  selectedSheet: PropTypes.number
}

export default ReportPlayground
