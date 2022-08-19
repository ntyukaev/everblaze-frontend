import { CHART_FIELDS } from './fragments'
import { gql } from '@apollo/client'

export const GET_CHARTS = gql`
  ${CHART_FIELDS}
  query Charts($sheetId: Int!) {
    charts(sheet_id: $sheetId) {
      ...ChartFields
    }
  }
`
