import PropTypes from 'prop-types'
import styles from './Playground.module.scss'

const Playground = ({ children, sidebar }) => {
  return (
    <div className={styles.Playground}>
        <div className={styles.PlaygroundSplit}>
          <div className={styles.PlaygroundLeft}>
            {children}
          </div>
          {sidebar}
        </div>
      </div>
  )
}

Playground.propTypes = {
  children: PropTypes.any,
  sidebar: PropTypes.any
}

export default Playground
