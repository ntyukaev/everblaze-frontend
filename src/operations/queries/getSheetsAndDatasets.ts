import { IDataset, ISheet, NullableIdentity } from './../../types/index'
import { COLUMN_FIELDS } from './fragments'
import { gql } from '@apollo/client'

export interface SheetsAndDatasetsData {
  sheets: ISheet[],
  datasets: IDataset[]
}

export interface SheetsAndDatasetsVars {
  reportId: NullableIdentity
}

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
