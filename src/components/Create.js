import React from 'react'
import {useQuery} from '@apollo/client'
import {CURRENT_USER_QUERY} from '../graphql/Queries'

export default function Create() {
  const {data} = useQuery(CURRENT_USER_QUERY)
  console.log(data)
  return <div>create</div>
}
