import { useSelector } from 'react-redux'
import { Rnd } from 'react-rnd'
import PropTypes from 'prop-types'
import ChartBuilder from '../ChartBuilder/ChartBuilder'
import styles from './ChartContainer.module.scss'

function withDraggableNResizable (Component) {
  function EnchancedComponent ({ x, y, ...props }) {
    const scale = useSelector((state) => state.sheetScale.scale)
    return (
      <Rnd
        className={styles.ChartContainer}
        bounds='parent'
        scale={scale}
        default={{
          x,
          y,
          width: '30%',
          height: '30%'
        }}
      >
        <Component {...props} />
      </Rnd>
    )
  }

  EnchancedComponent.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number
  }

  return EnchancedComponent
}

const ChartContainer = (props) => {
  const fields = [...props.fields]
  if (!fields) {
    return (
      <div className={styles.ChartContainer}>No Fields</div>
    )
  }

  // make sure all columns are the same length
  const fieldsSameLength = () => {
    const fieldLengths = fields.map((field) => field.column.cells.length)
    return fieldLengths.every((l) => fieldLengths[0] === l)
  }

  if (!fieldsSameLength) {
    return (
      <div>Error</div>
    )
  }

  const getData = () => {
    const data = Array.from({ length: fields[0].column.cells.length }, () => { return {} })
    return fields.reduce((acc, cur, fieldIndex) => {
      cur.column.cells.forEach((cell, cellIndex) => {
        const columnName = cur.column.name in acc[cellIndex] ? `${cur.column.name} (${fieldIndex})` : cur.column.name
        acc[cellIndex][columnName] = cell.value
      })
      return acc
    }, data)
  }

  const getFieldMapping = () => {
    return fields.reduce((acc, cur, fieldIndex) => {
      const { type } = cur
      if (!acc[type]) {
        acc[type] = []
      }
      const columnName = cur.column.name in acc[type] ? `${cur.column.name} (${fieldIndex})` : cur.column.name
      acc[type].push(columnName)
      return acc
    }, {})
  }

  const data = getData()
  const fieldMapping = getFieldMapping()

  return (
    <ChartBuilder type={props.type} data={data} fields={fieldMapping}/>
  )
}

ChartContainer.propTypes = {
  type: PropTypes.string,
  fields: PropTypes.array
}

export default withDraggableNResizable(ChartContainer)
