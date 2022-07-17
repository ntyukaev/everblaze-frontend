import { useSelector } from 'react-redux/es/exports'
import { Rnd } from 'react-rnd'
import PropTypes from 'prop-types'
import ChartContainer from '../ChartContainer'
import styles from './DraggableChart.module.scss'

const DraggableChart = ({ x, y, type, fields }) => {
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
      <ChartContainer />
    </Rnd>
  )
}

DraggableChart.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  type: PropTypes.string,
  fields: PropTypes.array
}

export default DraggableChart
