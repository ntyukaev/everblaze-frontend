import { useSelector, useDispatch } from 'react-redux'
import { Slider, Row, Col, Tooltip } from 'antd'
import { FullscreenOutlined } from '@ant-design/icons'
import { setValue } from '../../reducers/sheetScale'
import styles from './ScaleSlider.module.scss'

const ScaleSlider = () => {
  const dispatch = useDispatch()
  const scale = useSelector((state) => state.sheetScale.scale)
  const MIN_SCALE = useSelector((state) => state.sheetScale.MIN_SCALE)
  const MAX_SCALE = useSelector((state) => state.sheetScale.MAX_SCALE)
  const STEP = useSelector((state) => state.sheetScale.STEP)
  return (
    <div className={styles.ScaleSlider}>
      <Row className={styles.AntRow}>
        <Col span={10} offset={2}>
          <Slider className={styles.AntSlider}
            onChange={(val) => dispatch(setValue(val))} min={MIN_SCALE} max={MAX_SCALE} value={scale} step={STEP}/>
        </Col>
        <Col span={4} offset={2}>
          <div className={styles.ScaleValue}>{Math.round(scale * 100)}%</div>
        </Col>
        <Col span={4} offset={2}>
          <Tooltip title="Fit entire window" placement='topLeft'>
            <FullscreenOutlined className={styles.FitEntireWindow} onClick={() => dispatch(setValue(1))} />
          </Tooltip>
        </Col>
      </Row>
    </div>
  )
}

export default ScaleSlider
