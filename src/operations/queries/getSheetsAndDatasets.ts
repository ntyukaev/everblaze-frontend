import { COLUMN_FIELDS } from './fragments'
import { gql } from '@apollo/client'

export const GET_SHEETS_AND_DATASETS = gql`
  ${COLUMN_FIELDS}
  query SheetsAndDatasets($reportId: Int!) {
    sheets(report_id: $reportId) {
      id
      index
      name
    }
    datasets(report_id: $reportId) {
      id
      name
      columns {
        ...ColumnFields
      }
    }
  }
`
