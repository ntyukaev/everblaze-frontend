import { Spin } from 'antd'
import { TopMenu, Playground, ViewToolbar, RightSidebar, BottomInfo } from '../../Layout'
import DataLoader from '../../DataLoader'
import Spreadsheet from '../../Spreadsheet'
import { GET_DATASETS } from '../../../operations/queries/getDatasets'
import styles from './Data.module.scss'
import { useQuery } from '@apollo/client'
import { ReportImpl, SelectableDataset } from '../../../ts/interfaces'
import { FC, useEffect } from 'react'
import { updateReport } from '../../../operations/store/report'
import FieldPane from '../../FieldPane'

interface DataImpl extends ReportImpl, SelectableDataset {}

const Data: FC<DataImpl> = ({ id, selectedDataset }) => {
  const reportId = id
  const { error, loading, data } = useQuery(GET_DATASETS, { variables: { reportId } })
  useEffect(() => {
    if (!selectedDataset) {
      if (data?.datasets) {
        updateReport({ selectedDataset: data.datasets[0].id }, { reportId })
      }
    }
  }, [data, selectedDataset])

  if (error) {
    return (
      <div>An error occured</div>
    )
  }
  if (loading) {
    return (
      <div className={styles.Report}>
        <Spin />
      </div>
    )
  }
  return (
    <>
      <TopMenu/>
      <ViewToolbar/>
      <BottomInfo/>
      <Playground>
        <Playground.Body>
          <Playground.Canvas>
            <Spreadsheet selectedDataset={selectedDataset}/>
          </Playground.Canvas>
          <Playground.Sidebars>
            <RightSidebar title="Fields">
            <FieldPane datasets={data.datasets}/>
            </RightSidebar>
          </Playground.Sidebars>
        </Playground.Body>
      </Playground>
    </>
  )
}

export default DataLoader(Data)
