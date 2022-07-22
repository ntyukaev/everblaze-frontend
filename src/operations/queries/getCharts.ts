import { gql } from '@apollo/client'

export enum ChartTypes {
  LINE_CHART = 'LINE_CHART',
}

export interface Chart {
  id: number,
  type: keyof typeof ChartTypes,
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
  query Charts($sheetId: Int!) {
    charts(sheet_id: $sheetId) {
      id
      type
      x
      y
    }
  }
`
