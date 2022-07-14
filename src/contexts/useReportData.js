import { createContext, useContext } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import queryReportData from '../hooks/queryReportData'

const ReportDataContext = createContext({})

export const ReportDataProvider = ({ children }) => {
  const { pathname } = useLocation()
  const { params } = matchPath({ path: 'app/:reportId/*', exact: true, strict: true }, pathname)
  const { reportId } = params
  const { loading, error, data } = queryReportData(reportId)

  const value = {
    loading,
    error,
    data
  }
  return (
    <ReportDataContext.Provider value={value}>
      {children}
    </ReportDataContext.Provider>
  )
}

ReportDataProvider.propTypes = {
  children: PropTypes.any
}

const useReportData = () => {
  return useContext(ReportDataContext)
}

export default useReportData
