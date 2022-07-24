import { IDataset, NullableIdentity } from './../../types/index'
import { COLUMN_FIELDS } from './fragments'
import { gql } from '@apollo/client'

export interface DatasetData {
  datasets: IDataset[]
}

export interface DatasetsVars {
  reportId: NullableIdentity
}

export const GET_DATASETS = gql`
  ${COLUMN_FIELDS}
  query Datasets($reportId: Int!) {
    datasets(report_id: $reportId) {
      id
      name
      columns {
        ...ColumnFields
      }
    }
  }
`
