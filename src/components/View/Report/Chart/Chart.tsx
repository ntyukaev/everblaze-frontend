import { useQuery } from '@apollo/client'
import { Rnd } from 'react-rnd'
import { fieldsSameLength, getInputData, getColumnNames, getFieldMapping } from './utils'
import { FieldsData, FieldsVars, GET_FIELDS } from '../../../../operations/queries/getFields'
import ChartBuilder from './ChartBuilder'
import styles from './Chart.module.scss'
import { FC } from 'react'
import { IChart, Scalable } from '../../../../types'
import { selectedChartVar } from '../../../../apollo'

interface ChartWithScale extends Scalable, IChart { }

const withDraggable = (Component: any) => function withDraggable ({ x, y, scale, type, id }: ChartWithScale) {
  const handleMouseDown = () => {
    selectedChartVar(id)
  }
  return (
    <Rnd
      onMouseDown={handleMouseDown}
      bounds='parent'
      scale={scale}
      className={`${styles.Chart}` + (selectedChartVar() === id ? ` ${styles.ChartSelected}` : '')}
      default={{
        x,
        y,
        width: '30%',
        height: '30%'
      }}
    >
      <Component type={type} id={id} />
    </Rnd>
  )
}

const Chart: FC<ChartWithScale> = ({ type, id }) => {
  const chartId = id
  const { error, loading, data } = useQuery<FieldsData, FieldsVars>(GET_FIELDS, { variables: { chartId } })

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
