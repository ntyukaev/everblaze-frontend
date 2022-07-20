import { useSelector } from 'react-redux'
import { Rnd } from 'react-rnd'
import PropTypes from 'prop-types'
import ChartBuilder from './ChartBuilder'
import { useFields } from '../../../../hooks'
import styles from './Chart.module.scss'

function withDraggableNResizable (Component) {
  function EnchancedComponent ({ x, y, ...props }) {
    const scale = useSelector((state) => state.sheetScale.scale)
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

const Chart = ({ type, id }) => {
  const { error, loading, data } = useFields(+id)

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

  if (!(data.fields.length > 0)) {
    return (
      <div>No Fields Provided</div>
    )
  }

  const fieldsSameLength = (fields) => {
    const fieldLengths = fields.map((field) => field.column.cells.length)
    return fieldLengths.every((f) => fieldLengths[0] === f)
  }

  if (!fieldsSameLength(data.fields)) {
    return (
      <div>Fields Are Not Same Length.</div>
    )
  }

  const getColumnNames = (fields) => {
    const count = {}
    return fields.map((field) => {
      let name = field.column.name
      if (name in count) {
        name = `${name} (${count[name]})`
        count[name] += 1
      } else {
        count[name] = 1
      }
      return name
    })
  }

  const columnNames = getColumnNames(data.fields)

  const getInputData = (fields) => {
    const data = Array.from({ length: fields[0].column.cells.length }, () => { return {} })
    return fields.reduce((acc, cur, fieldIndex) => {
      cur.column.cells.forEach((cell, cellIndex) => {
        const columnName = columnNames[fieldIndex]
        acc[cellIndex][columnName] = cell.value
      })
      return acc
    }, data)
  }

  const inputData = getInputData(data.fields)

  const getFieldMapping = (fields) => {
    return fields.reduce((acc, cur, fieldIndex) => {
      const { type } = cur
      if (!acc[type]) {
        acc[type] = []
      }
      const columnName = columnNames[fieldIndex]
      acc[type].push(columnName)
      return acc
    }, {})
  }

  const fieldMapping = getFieldMapping(data.fields)

  return (
    <ChartBuilder type={type} data={inputData} fields={fieldMapping}/>
  )
}

Chart.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string
}

export default withDraggableNResizable(Chart)
