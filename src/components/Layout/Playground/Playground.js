import PropTypes from 'prop-types'
import styles from './Playground.module.scss'

const Playground = ({ children }) => {
  return (
    <div className={styles.Playground}>
        { children }
    </div>
  )
}

Playground.propTypes = {
  children: PropTypes.any
}

export const Body = ({ children }) => {
  return (
    <div className={styles.PlaygroundBody}>{ children }</div>
  )
}

Body.propTypes = {
  children: PropTypes.any
}

export const Canvas = ({ children }) => {
  return (
    <div className={styles.PlaygroundCanvas}>{ children }</div>
  )
}

Canvas.propTypes = {
  children: PropTypes.any
}

export const Sidebars = ({ children }) => {
  return (
    <div className={styles.PlaygroundSidebars}>{ children }</div>
  )
}

Sidebars.propTypes = {
  children: PropTypes.any
}

Playground.Body = Body
Playground.Canvas = Canvas
Playground.Sidebars = Sidebars

export default Playground
