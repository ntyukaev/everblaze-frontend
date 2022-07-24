import { CHART_FIELDS } from './fragments'
import { gql } from '@apollo/client'
import { IChart } from '../../types'
export interface ChartsData {
  charts: IChart[]
}

export interface ChartsVars {
  sheetId: number | null
}

export const GET_CHARTS = gql`
  ${CHART_FIELDS}
  query Charts($sheetId: Int!) {
    charts(sheet_id: $sheetId) {
      ...ChartFields
    }
  }
`
