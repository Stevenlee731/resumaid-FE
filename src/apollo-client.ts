import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  concat,
  NormalizedCacheObject,
} from '@apollo/client'
import {onError} from '@apollo/link-error'
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

  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({message, locations, path}) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      )
    if (networkError)
      console.log(
        `[Network error]: ${networkError}. Backend is unreachable. Is it running?`,
      )
  })

  const link = new HttpLink({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
  })

  const composedLinks = ApolloLink.from([authMiddleware, link])

  const cache = new InMemoryCache()
  return new ApolloClient({
    cache,
    credentials: 'include',
    link: composedLinks,
  })
}
