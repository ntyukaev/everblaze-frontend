import { ReportImpl } from './../../ts/interfaces'
import { GET_REPORT } from './../queries/getReport'
import apollo from '../../apollo'
import { Identity } from '../../ts/types'

interface ReadReportImpl {
  (variables: { reportId: Identity }): { report: ReportImpl } | null
}

export const readReport: ReadReportImpl = (variables) => {
  return apollo.readQuery({
    query: GET_REPORT,
    variables
  })
}

export const updateReport = (data: {[key: string]: number | string | null}, variables: { reportId: Identity }) => {
  const existingData = readReport(variables)
  apollo.writeQuery({
    query: GET_REPORT,
    data: {
      report: {
        ...existingData!.report,
        ...data
      }
    },
    variables
  })
}
