import { gql } from '@apollo/client'

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
