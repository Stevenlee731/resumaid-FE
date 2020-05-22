import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  concat,
  NormalizedCacheObject,
} from '@apollo/client'
import {endpoint, prodEndpoint} from './config'

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token')

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })

    return forward(operation)
  })

  const link = new HttpLink({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
  })

  const cache = new InMemoryCache()
  return new ApolloClient({
    cache,
    credentials: 'include',
    link: concat(authMiddleware, link),
  })
}
