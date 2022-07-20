import PropTypes from 'prop-types'
import styles from './BottomInfo.module.scss'

const BottomInfo = ({ children }) => {
  return (
    <div className={styles.BottomInfo}>
      { children }
    </div>
  )
}

BottomInfo.propTypes = {
  children: PropTypes.any
}

export default BottomInfo
