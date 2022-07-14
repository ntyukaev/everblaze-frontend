import PropTypes from 'prop-types'
import styles from './TabList.module.scss'

const TabList = ({ children }) => {
  return (
    <div className={styles.TabList}>{ children }</div>
  )
}

TabList.propTypes = {
  children: PropTypes.any
}

export default TabList
