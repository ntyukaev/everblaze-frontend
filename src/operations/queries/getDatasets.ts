import { DATASET_FIELDS } from './fragments'
import { gql } from '@apollo/client'

export const GET_DATASETS = gql`
  ${DATASET_FIELDS}
  query Datasets($reportId: Int!) {
    datasets(report_id: $reportId) {
      ...DatasetFields
    }
  }
`
