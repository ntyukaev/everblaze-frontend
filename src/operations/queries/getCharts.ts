import { CHART_FIELDS } from './fragments'
import { ChartTypeEnum } from '../../types'
import { gql } from '@apollo/client'
export interface Chart {
  id: number,
  type: keyof typeof ChartTypeEnum,
  x: number,
  y: number
}

export interface ChartsData {
  charts: Chart[]
}

export interface ChartsVars {
  sheetId: number
}

export const GET_CHARTS = gql`
  ${CHART_FIELDS}
  query Charts($sheetId: Int!) {
    charts(sheet_id: $sheetId) {
      ...ChartFields
    }
  }
`
