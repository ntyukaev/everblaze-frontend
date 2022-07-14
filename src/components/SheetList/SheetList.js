import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button } from 'antd'
import { useSheets } from '../../api/graphql'
import styles from './SheetList.module.scss'

const SheetList = () => {
  const selectedSheet = useSelector((state) => state.selectedSheet.selectedSheet)
  const [sheets, setSheets] = useState([])
  const { reportId } = useParams()
  const { loading, error, data } = useSheets(+reportId)

  useEffect(() => {
    if (!loading) {
      setSheets([...data.report.sheet].sort((el1, el2) => el1.index > el2.index ? 1 : -1))
    }
  }, [loading])

  if (loading || error) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className={styles.SheetList}>
      {sheets.map((sheet) => <Button type='text' key={sheet.index}
        className={selectedSheet === sheet.index && styles.SheetActive}>{sheet.name}</Button>)}
    </div>
  )
}

export default SheetList
