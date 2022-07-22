import { InMemoryCache, ApolloClient, gql, makeVar } from '@apollo/client'

const GRAPHQL_ENDPOINT = 'http://localhost:8000/graphql'

const typeDefs = gql`
  extend type Query {
    selectedSheet: Int
    selectedChart: Int
  }
`
type selectedVar = {
  [key: number]: number
}
// TODO: Fix this assignment to just single value
export const selectedSheetsVar = makeVar<selectedVar>({})
export const selectedChartsVar = makeVar<selectedVar>({})

export const cache = new InMemoryCache({
  typePolicies: {
    Report: {
      fields: {
        selectedSheet: {
          read (_, { readField }) {
            // @ts-ignore: Object is possibly 'null'.
            const id: number = +readField('id')
            return selectedSheetsVar()[id] || null
          }
        },
        selectedChart: {
          read (_, { readField }) {
            // @ts-ignore: Object is possibly 'null'.
            const id: number = +readField('id')
            return selectedChartsVar()[id] || null
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
