import { FC } from 'react'
import { FieldMapping, IInputData } from '../Chart/utils'

const byte2Hex = (n: number) => {
  const nybHexString = '0123456789ABCDEF'
  return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1)
}

const RGB2Color = (r:number, g:number, b:number) => '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b)

export interface IChart {
  data: IInputData,
  fields: FieldMapping
}

export interface EnchancedChart extends IChart {
  generateColor: Function
}

const withChartToolkit = (Component:FC<EnchancedChart>) => {
  const EnchancedChart:FC<IChart> = ({ data, fields }) => {
    function * generateColor () {
      const frequency = 0.5
      while (true) {
        for (let i = 0; i < 32; i++) {
          const r = Math.sin(frequency * i + 0) * 127 + 128
          const g = Math.sin(frequency * i + 2) * 127 + 128
          const b = Math.sin(frequency * i + 4) * 127 + 128
          yield RGB2Color(r, g, b)
        }
      }
    }

    const gc = () => {
      const generator = generateColor()
      return () => {
        return generator.next().value
      }
    }

    return (
      <Component generateColor={gc()} data={data} fields={fields} />
    )
  }
  return EnchancedChart
}

export default withChartToolkit
