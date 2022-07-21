import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import { Spin } from 'antd'
import { GET_SHEETS } from '../../../operations/queries/getSheets'
import { selectedSheetsVar } from '../../../apollo'
import { writeSheet } from '../../../operations/store'
import { TopMenu, Playground, TabList, ViewToolbar, BottomInfo, RightSidebar } from '../../Layout'
import ScaleOnCtrlWheel from '../../ScaleOnCtrlWheel'
import DataLoader from '../../DataLoader'
import ScaleSlider from '../../ScaleSlider'
import Sheet from './Sheet'
import SheetList from './SheetList'
import styles from './Report.module.scss'

const Report = ({ id, name, selectedSheet, scaleConfig, setScale }) => {
  const reportId = id
  const { error, loading, data } = useQuery(GET_SHEETS, { variables: { reportId } })
  useEffect(() => {
    if (!selectedSheet) {
      if (data?.sheets) {
        if (data.sheets.length > 0) {
          selectedSheetsVar({
            ...selectedSheetsVar(),
            [reportId]: data.sheets[0].id
          })
        } else {
          writeSheet({ index: 0, id: 10003, name: 'New Sheet' }, { reportId })
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
            <Sheet scale={scaleConfig.scale} selectedSheet={selectedSheet} />
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
        <ScaleSlider { ...scaleConfig } setScale={setScale} />
      </BottomInfo>
    </>
  )
}

Report.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  selectedSheet: PropTypes.number,
  scaleConfig: PropTypes.object,
  setScale: PropTypes.func
}

export default DataLoader(ScaleOnCtrlWheel(Report))
