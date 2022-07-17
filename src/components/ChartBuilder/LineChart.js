import { LineChart as LC, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import PropTypes from 'prop-types'
import withChartToolkit from './withChartToolkit'

const LineChart = ({ data, fields, generateColor }) => {
  if (!fields.X || !fields.Y) {
    return (
      <div>Error</div>
    )
  }
  return (
    <ResponsiveContainer height='100%' width='100%'>
      <LC data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={fields.X[0]} />
        <YAxis />
        <Tooltip />
        <Legend />
        {fields.X.map((field) => (
          <Line key={field} type="monotone" dataKey={field} stroke={generateColor()} activeDot={{ r: 8 }} />
        ))}
      </LC>
    </ResponsiveContainer>
  )
}

LineChart.propTypes = {
  data: PropTypes.array,
  fields: PropTypes.object,
  generateColor: PropTypes.func
}

export default withChartToolkit(LineChart)
