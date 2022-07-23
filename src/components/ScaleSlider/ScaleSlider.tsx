import { FC } from 'react'
import { Slider, Row, Col, Tooltip } from 'antd'
import { FullscreenOutlined } from '@ant-design/icons'
import styles from './ScaleSlider.module.scss'
import { ScaleConfig } from '../ScaleOnCtrlWheel/scaleReducer'

interface IScaleSlider extends ScaleConfig {
  setScale: Function
}

const ScaleSlider: FC<IScaleSlider> = ({ scale, minScale, maxScale, step, setScale }) => {
  return (
    <div className={styles.ScaleSlider}>
      <Row className={styles.AntRow}>
        <Col span={10} offset={2}>
          <Slider className={styles.AntSlider}
            onChange={val => setScale(val)} min={minScale} max={maxScale} value={scale} step={step}/>
        </Col>
        <Col span={4} offset={2}>
          <div className={styles.ScaleValue}>{Math.round(scale * 100)}%</div>
        </Col>
        <Col span={4} offset={2}>
          <Tooltip title="Fit entire window" placement='topLeft'>
            <FullscreenOutlined className={styles.FitEntireWindow} onClick={() => setScale(1.0)} />
          </Tooltip>
        </Col>
      </Row>
    </div>
  )
}

export default ScaleSlider
