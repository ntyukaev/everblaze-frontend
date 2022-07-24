import { FC, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Spin } from 'antd'
import { GET_SHEETS } from '../../../operations/queries/getSheets'
import { createSheet, updateReport } from '../../../operations/store'
import { TopMenu, Playground, TabList, ViewToolbar, BottomInfo, RightSidebar } from '../../Layout'
import ScaleOnCtrlWheel from '../../ScaleOnCtrlWheel'
import DataLoader from '../../DataLoader'
import ScaleSlider from '../../ScaleSlider'
import Sheet from './Sheet'
import SheetList from './SheetList'
import styles from './Report.module.scss'
import { ScaleConfig } from '../../ScaleOnCtrlWheel/scaleReducer'
import VisualizationPane from './VisualizationPane'
import { IReport, SelectableChart, SelectableSheet } from '../../../types'

interface IReportWithScale extends IReport, SelectableSheet, SelectableChart {
  scaleConfig: ScaleConfig,
  setScale: Function
}

const Report: FC<IReportWithScale> = ({ id, name, selectedChart, selectedSheet, scaleConfig, setScale }) => {
  const reportId = id
  const { error, loading, data } = useQuery(GET_SHEETS, { variables: { reportId } })
  useEffect(() => {
    if (!selectedSheet) {
      if (data?.sheets) {
        if (data.sheets.length > 0) {
          updateReport({ selectedSheet: data.sheets[0].id }, { reportId: id })
        } else {
          createSheet({ index: 0, name: 'New Sheet' }, { reportId })
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
            <Sheet reportId={reportId} scale={scaleConfig.scale}
              selectedChart={selectedChart} selectedSheet={selectedSheet} />
            <TabList>
              <SheetList selectedSheet={selectedSheet} sheets={data.sheets} />
            </TabList>
          </Playground.Canvas>
          <Playground.Sidebars>
            <RightSidebar key='Visualizations' title="Visualizations">
              <VisualizationPane selectedChart={selectedChart} selectedSheet={selectedSheet}/>
            </RightSidebar>
            <RightSidebar key="Fields" title="Fields">
              <div>Visualizations</div>
            </RightSidebar>
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

export default DataLoader(ScaleOnCtrlWheel(Report))
