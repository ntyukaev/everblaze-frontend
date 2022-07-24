import { FC } from 'react'
import { LineChart as LC, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import withChartToolkit, { EnchancedChart } from './withChartToolkit'

const LineChart: FC<EnchancedChart> = ({ data, fields, generateColor }) => {
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
        <YAxis dataKey={fields.Y[0]}/>
        <Tooltip />
        <Legend />
        {fields.X.map((field) => (
          <Line key={field} type="monotone" dataKey={field} stroke={generateColor()} activeDot={{ r: 8 }} />
        ))}
      </LC>
    </ResponsiveContainer>
  )
}

export default withChartToolkit(LineChart)
