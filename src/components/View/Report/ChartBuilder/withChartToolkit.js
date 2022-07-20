const byte2Hex = (n) => {
  const nybHexString = '0123456789ABCDEF'
  return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1)
}

const RGB2Color = (r, g, b) => '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b)

const withChartToolkit = (Component) => {
  const EnchancedChart = (props) => {
    function * generateColor () {
      const frequency = 0.1
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
      <Component generateColor={gc()} {...props} />
    )
  }
  return EnchancedChart
}

export default withChartToolkit
