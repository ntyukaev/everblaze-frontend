import { InMemoryCache, ApolloClient, gql, makeVar } from '@apollo/client'

const GRAPHQL_ENDPOINT = 'http://localhost:8000/graphql'

const typeDefs = gql`
  extend type Query {
    selectedSheet: Int
    selectedChart: Int
  }
`

export const selectedSheetVar = makeVar<number | null>(null)
export const selectedChartVar = makeVar<number | null>(null)

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
    }
  }
})

const apollo = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache,
  typeDefs
})

export default apollo
