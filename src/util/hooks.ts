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

export function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial)

  function handleChange(e: any) {
    let {value} = e.target
    const {name, type} = e.target
    if (type === 'number') {
      value = parseInt(value)
    }
    if (type === 'file') {
      ;[value] = e.target.files
    }
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  function resetForm() {
    setInputs(initial)
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, '']),
    )
    setInputs(blankState)
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  }
}

export function useSafeUnMount(fn: Function): void {
  let isMounted = true
  useEffect(() => {
    if (isMounted) {
      fn()
    }
    return (): void => {
      isMounted = false
    }
  }, [])
}
