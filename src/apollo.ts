import { InMemoryCache, ApolloClient, gql } from '@apollo/client'
import { CrudEnum } from './ts/enums'

const GRAPHQL_ENDPOINT = 'http://localhost:8000/graphql'

const typeDefs = gql`
  extend type Report {
    selectedSheet: Int
    selectedChart: Int
    selectedDataset: Int
  }
  extend type Chart {
    status: String
  }
`

export const cache = new InMemoryCache({
  typePolicies: {
    Report: {
      fields: {
        selectedSheet: {
          read (_) {
            return _ || null
          }
        },
        selectedChart: {
          read (_) {
            return _ || null
          }
        },
        selectedDataset: {
          read (_) {
            return _ || null
          }
        }
      }
    },
    Chart: {
      fields: {
        status: {
          read (_) {
            return _ || CrudEnum.READ
          }
        }
      }
    },
    Cell: {
      fields: {
        status: {
          read (_) {
            return _ || CrudEnum.READ
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
