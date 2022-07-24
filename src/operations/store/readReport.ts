import { IReport } from './../../types/index'
import { GET_REPORT } from './../queries/getReport'
import apollo from '../../apollo'
import { Identity } from '../../types'

const readReport = (variables: { reportId: Identity }): { report: IReport } | null => {
  return apollo.readQuery({
    query: GET_REPORT,
    variables
  })
}

export default readReport
