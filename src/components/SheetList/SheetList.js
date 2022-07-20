import PropTypes from 'prop-types'
import { Button } from 'antd'
import styles from './SheetList.module.scss'

const SheetList = ({ sheets, selectedSheet }) => {
  return (
    <div className={styles.SheetList}>
      {sheets.map((sheet) => <Button type='text' key={sheet.index}
        className={selectedSheet === sheet.id && styles.SheetActive}>{sheet.name}</Button>)}
    </div>
  )
}

SheetList.propTypes = {
  sheets: PropTypes.array,
  selectedSheet: PropTypes.number
}

export default SheetList
