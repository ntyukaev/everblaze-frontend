import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import { useSheets } from '../../../hooks'
import { selectedSheetsVar } from '../../../apollo'
import { writeSheet } from '../../../operations'
import { TopMenu, Playground, TabList, ViewToolbar, BottomInfo, RightSidebar } from '../../Layout'
import ReportLoader from './ReportLoader'
import ScaleSlider from '../../ScaleSlider'
import Sheet from './Sheet'
import SheetList from './SheetList'
import styles from './Report.module.scss'

const Report = ({ id, name, selectedSheet }) => {
  const { error, loading, data } = useSheets(+id)
  useEffect(() => {
    if (!selectedSheet) {
      if (data?.sheets) {
        if (data.sheets.length > 0) {
          selectedSheetsVar({
            ...selectedSheetsVar(),
            [id]: data.sheets[0].id
          })
        } else {
          writeSheet({ index: 0, id: 10003, name: 'New Sheet' }, { id })
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
      <div className={styles.Report}>
        <Spin />
      </div>
    )
  }

  return (
    <>
      <Playground>
        <Playground.Body>
          <Playground.Canvas>
            <Sheet selectedSheet={selectedSheet} />
            <TabList>
              <SheetList selectedSheet={selectedSheet} sheets={data.sheets} />
            </TabList>
          </Playground.Canvas>
          <Playground.Sidebars>
            <RightSidebar key='Visualizations' title="Visualizations" />
            <RightSidebar key="Fields" title="Fields" />
          </Playground.Sidebars>
        </Playground.Body>
      </Playground>
      <TopMenu reportName={name} />
      <ViewToolbar />
      <BottomInfo>
        <ScaleSlider />
      </BottomInfo>
    </>
  )
}

Report.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  selectedSheet: PropTypes.number
}

export default ReportLoader(Report)
