import { InMemoryCache, ApolloClient, gql, makeVar } from '@apollo/client'

const GRAPHQL_ENDPOINT = 'http://localhost:8000/graphql'

const typeDefs = gql`
  extend type Query {
    selectedSheet: Int
    selectedChart: Int
  }
`
export const selectedSheetsVar = makeVar({})
export const selectedChartsVar = makeVar({})

export const cache = new InMemoryCache({
  typePolicies: {
    Report: {
      fields: {
        selectedSheet: {
          read (_, { readField }) {
            return selectedSheetsVar()[readField('id')] || null
          }
        },
        selectedChart: {
          read (_, { readField }) {
            return selectedChartsVar()[readField('id')] || null
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
