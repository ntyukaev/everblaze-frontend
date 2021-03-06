import { useQuery } from '@apollo/client'
import { Rnd } from 'react-rnd'
import { fieldsSameLength, getInputData, getColumnNames, getFieldMapping } from './utils'
import { GET_FIELDS } from '../../operations/queries/getFields'
import ChartBuilder from '../ChartBuilder'
import styles from './Chart.module.scss'
import { FC } from 'react'
import { IChart, Identity, Scalable, SelectableChart } from '../../types'
import { updateReport } from '../../operations/store'

interface ChartWithScale extends Scalable, IChart, SelectableChart {
  reportId: Identity
}

const withDraggable = (Component: any) => function withDraggable ({ x, y, scale, type, id, reportId, selectedChart }: ChartWithScale) {
  const handleMouseDown = () => {
    updateReport({ selectedChart: id }, { reportId })
  }
  return (
    <Rnd
      onMouseDown={handleMouseDown}
      bounds='parent'
      scale={scale}
      className={`${styles.Chart}` + (selectedChart === id ? ` ${styles.ChartSelected}` : '')}
      default={{
        x,
        y,
        width: '30%',
        height: '30%'
      }}
    >
      <Component reportId={reportId} type={type} id={id} />
    </Rnd>
  )
}

const Chart: FC<ChartWithScale> = ({ type, id }) => {
  const chartId = id
  const { error, loading, data } = useQuery(GET_FIELDS, { variables: { chartId } })

  if (error) {
    return (
      <div>An error occured</div>
    )
  }
  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  if (!(data!.fields.length > 0)) {
    return (
      <div>No Fields Provided</div>
    )
  }
  if (!fieldsSameLength(data!.fields)) {
    return (
      <div>Fields Are Not Same Length.</div>
    )
  }

  const columnNames = getColumnNames(data!.fields)
  const inputData = getInputData(data!.fields, columnNames)
  const fieldMapping = getFieldMapping(data!.fields, columnNames)

  return (
    <div className={styles.ChartInner}>
      <ChartBuilder type={type} data={inputData} fields={fieldMapping} />
    </div>
  )
}

export default withDraggable(Chart)
