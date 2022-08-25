import { FC } from 'react'
import { LineChart as LC, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import withChartToolkit, { EnchancedChart } from './withChartToolkit'

const findUniques = (data:any, fields:any) => {
  let processedData = [...data]
  fields.forEach((field: string) => {
    const vals = processedData.map((item:any) => item[field])
    vals.forEach((v: any, i: number) => {
      if (vals.indexOf(v) !== i) {
        processedData[i] = null
      }
    })
    processedData = processedData.filter((item: any) => !!item)
  })
  return processedData
}

const LineChart: FC<EnchancedChart> = ({ data, fields, generateColor }) => {
  if (!fields.X || !fields.Y) {
    return (
      <div>Error</div>
    )
  }
  const processedData = findUniques(data, [fields.X[0]]).sort((a:any, b:any) => a[fields.X[0]] > b[fields.X[0]] ? 1 : -1)
  return (
    <ResponsiveContainer height='100%' width='100%'>
      <LC data={processedData}>
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
