import React, {useEffect} from 'react'
import {useLazyQuery} from '@apollo/client'
import {CURRENT_USER_QUERY} from '../graphql/Queries'

export default function Create() {
  const [getCurrentUser, {data, loading, error}] = useLazyQuery(
    CURRENT_USER_QUERY,
  )

  let isMounted = true
  useEffect(() => {
    if (isMounted) {
      getCurrentUser()
    }
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <div style={{gridArea: 'left'}}>Left</div>
      <div style={{gridArea: 'content'}}>create</div>
      <div style={{gridArea: 'right'}}>right</div>
    </>
  )
}
