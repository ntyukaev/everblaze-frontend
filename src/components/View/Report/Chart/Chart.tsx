import { useQuery } from '@apollo/client'
import { Rnd } from 'react-rnd'
import { fieldsSameLength, getInputData, getColumnNames, getFieldMapping } from './utils'
import { FieldsData, FieldsVars, GET_FIELDS } from '../../../../operations/queries/getFields'
import ChartBuilder from './ChartBuilder'
import styles from './Chart.module.scss'
import { FC } from 'react'
import { ChartProps } from '../../../../types'

const Chart: FC<ChartProps> = ({ x, y, scale, type, id }) => {
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
    <Rnd
      className={styles.Chart}
      bounds='parent'
      scale={scale}
      default={{
        x,
        y,
        width: '30%',
        height: '30%'
      }}
    >
      <ChartBuilder type={type} data={inputData} fields={fieldMapping} />
    </Rnd>
  )
}

export default Chart
