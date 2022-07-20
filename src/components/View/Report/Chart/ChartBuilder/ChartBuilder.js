import PropTypes from 'prop-types'
import chartTypes from './chartTypes'

const ChartBuilder = ({ type, data, fields }) => {
  const ChartComponent = chartTypes[type]
  return (
    <ChartComponent data={data} fields={fields}/>
  )
}

ChartBuilder.propTypes = {
  type: PropTypes.string,
  data: PropTypes.array,
  fields: PropTypes.object
}

export default ChartBuilder
