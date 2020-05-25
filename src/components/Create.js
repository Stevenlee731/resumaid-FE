import React, {useEffect, useRef} from 'react'
import {useLazyQuery} from '@apollo/client'
import {CURRENT_USER_QUERY} from '../graphql/Queries'
import {useSafeUnMount} from '../util/hooks'

// const Parent = ({children}) => {
//   const ref = useRef()
//   const parent = useParent(ref)

//   return (
//     <div className="parent" ref={ref}>
//       {children}
//     </div>
//   )
// }

export default function Create() {
  const [getCurrentUser, {data, loading, error}] = useLazyQuery(
    CURRENT_USER_QUERY,
  )

  useSafeUnMount(getCurrentUser)

  console.log(data)

  if (loading) {
    return <div>Loading</div>
  }

  if (data) {
    const {authenticatedUser} = data
    console.log(authenticatedUser)
  }

  return (
    <>
      <div style={{gridArea: 'left'}}>Left</div>
      <div style={{gridArea: 'content'}}>create</div>
      <div style={{gridArea: 'right'}}>right</div>
    </>
  )
}
