import PropTypes from 'prop-types'
import chartEnum from './chartEnum'

const ChartBuilder = ({ type, data, fields }) => {
  const ChartComponent = chartEnum[type]
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
