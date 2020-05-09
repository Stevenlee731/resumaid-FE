import React, {useEffect, useState} from 'react'
import {Routes, Route, Link, useParams} from 'react-router-dom'
import Modules from './Modules'

import styled from 'styled-components'
import {formatResumeData} from '../util/helpers'

const Users = (): JSX.Element => {
  const {userId} = useParams()
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch(
      'https://gist.githubusercontent.com/Stevenlee731/dde8a4a37620642b13e3c6336703a243/raw/c002a2279055ffb0f777f61abe9ebb0552d686b2/resume.json',
    )
      .then(res => res.json())
      .then(res => setUser(res))
  }, [])

  if (user) {
    const data = formatResumeData(user)
    return (
      <>
        {data.map(block => {
          return (
            <Modules
              key={block.module}
              module={block.module}
              data={block.data}
            />
          )
        })}
      </>
    )
  } else {
    return <div></div>
  }
}

export default Users
