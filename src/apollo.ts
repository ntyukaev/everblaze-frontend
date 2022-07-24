import { NullableIdentity } from './types/index'
import { InMemoryCache, ApolloClient, gql, makeVar } from '@apollo/client'
import { CrudEnum } from './types'

const GRAPHQL_ENDPOINT = 'http://localhost:8000/graphql'

const typeDefs = gql`
  extend type Report {
    selectedSheet: Int
    selectedChart: Int
  }
  extend type Chart {
    status: String
  }
`

export const selectedSheetVar = makeVar<NullableIdentity>(null)
export const selectedChartVar = makeVar<NullableIdentity>(null)

export const cache = new InMemoryCache({
  typePolicies: {
    Report: {
      fields: {
        selectedSheet: {
          read () {
            return selectedSheetVar()
          }
        },
        selectedChart: {
          read () {
            return selectedChartVar()
          }
        }
      }
    },
    Chart: {
      fields: {
        status: {
          read (_) {
            return _ || CrudEnum.READ
          },
          merge (_, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const apollo = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache,
  typeDefs
})

export default apollo
