import { FC, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Spin } from 'antd'
import { createSheet } from '../../../operations/store/sheet'
import { updateReport } from '../../../operations/store/report'
import { TopMenu, Playground, TabList, ViewToolbar, BottomInfo, RightSidebar } from '../../Layout'
import ScaleOnCtrlWheel from '../../ScaleOnCtrlWheel'
import DataLoader from '../../DataLoader'
import ScaleSlider from '../../ScaleSlider'
import Sheet from '../../Sheet'
import SheetList from '../../SheetList'
import styles from './Report.module.scss'
import { ScaleConfig } from '../../ScaleOnCtrlWheel/scaleReducer'
import VisualizationPane from '../../VisualizationPane'
import { ReportImpl, SelectableChart, SelectableDataset, SelectableSheet } from '../../../ts/interfaces'
import FieldPane from '../../FieldPane'
import { GET_SHEETS_AND_DATASETS } from '../../../operations/queries/getSheetsAndDatasets'
interface ReportWithScale extends ReportImpl, SelectableSheet, SelectableChart, SelectableDataset {
  scaleConfig: ScaleConfig,
  setScale: Function
}

const Report: FC<ReportWithScale> = ({ id, name, selectedDataset, selectedChart, selectedSheet, scaleConfig, setScale }) => {
  const reportId = id
  const { error, loading, data } = useQuery(GET_SHEETS_AND_DATASETS, { variables: { reportId } })
  useEffect(() => {
    if (!selectedSheet) {
      if (data?.sheets) {
        if (data.sheets.length > 0) {
          updateReport({ selectedSheet: data.sheets[0].id }, { reportId })
        } else {
          createSheet({ index: 0, name: 'New Sheet' }, { reportId })
        }
      }
    }
  }, [data, selectedSheet])

  useEffect(() => {
    if (!selectedDataset) {
      if (data?.datasets) {
        updateReport({ selectedDataset: data.datasets[0].id }, { reportId })
      }
    }
  }, [data, selectedDataset])

  if (error) {
    console.log(error)
    return (
      <div>An error occured11</div>
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
              <SheetList reportId={reportId} selectedSheet={selectedSheet} sheets={data.sheets} />
            </TabList>
          </Playground.Canvas>
          <Playground.Sidebars>
            <RightSidebar key='Visualizations' title="Visualizations">
              <VisualizationPane selectedChart={selectedChart} selectedSheet={selectedSheet}/>
            </RightSidebar>
            <RightSidebar key="Fields" title="Fields">
              <FieldPane selectedChart={selectedChart} datasets={data.datasets}/>
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
