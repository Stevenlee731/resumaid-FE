import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  concat,
  NormalizedCacheObject,
} from '@apollo/client'
import {persistCache} from 'apollo-cache-persist'
import React, {useState, useEffect} from 'react'
import {PersistentStorage, PersistedData} from 'apollo-cache-persist/types'
import {createApolloClient} from '../apollo-client'

export function useOnClickOutside(ref: any, handler: any) {
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return (): void => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export function usePersistedApolloClient(): {
  client: ApolloClient<NormalizedCacheObject> | undefined
} {
  const [client, setClient] = useState<
    ApolloClient<NormalizedCacheObject> | undefined
  >(undefined)
  useEffect(() => {
    const client = createApolloClient()

    persistCache({
      cache: client.cache,
      storage: window.localStorage as PersistentStorage<
        PersistedData<NormalizedCacheObject>
      >,
    }).then(() => {
      setClient(client)
    })
    return (): void => {
      /**/
    }
  }, [])

  return {client}
}
