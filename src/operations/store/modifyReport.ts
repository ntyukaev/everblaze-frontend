import { GET_REPORT } from './../queries/getReport'
import apollo from '../../apollo'
import { Identity } from './../../types/index'
import readReport from './readReport'

const modifyReport = (data: {[key: string]: number | string | null}, variables: { reportId: Identity }) => {
  const existingData = readReport(variables)
  apollo.writeQuery({
    query: GET_REPORT,
    data: {
      report: {
        ...existingData,
        ...data
      }
    }
  })
}

export default modifyReport
