import { TopMenu, Playground, ViewToolbar, RightSidebar, BottomInfo } from '../../Layout'
import FieldPane from '../../FieldPane'
import DataLoader from '../../DataLoader'
import { ReportImpl, SelectableChart, SelectableDataset } from '../../../ts/interfaces'
import { FC, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_DATASETS } from '../../../operations/queries/getDatasets'
import styles from './Model.module.scss'
import { Spin } from 'antd'
import { updateReport } from '../../../operations/store/report'
import ModelList from '../../ModelList'

interface ModelImpl extends SelectableChart, ReportImpl, SelectableDataset {}

const Model: FC<ModelImpl> = ({ selectedChart, selectedDataset, id }) => {
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
      <div>An error occured.</div>
    )
  }

  if (loading) {
    return (
      <div className={styles.Model}>
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
            <ModelList datasets={data.datasets}/>
          </Playground.Canvas>
          <Playground.Sidebars>
            <RightSidebar key="Properties" title="Properties">
              <div>Properties</div>
            </RightSidebar>
            <RightSidebar key="Fields" title="Fields">
              <FieldPane selectedChart={selectedChart} datasets={data.datasets}/>
            </RightSidebar>
          </Playground.Sidebars>
        </Playground.Body>
      </Playground>
    </>
  )
}

export default DataLoader(Model)
