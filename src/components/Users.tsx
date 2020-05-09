import React, {useEffect, useState} from 'react'
import {Routes, Route, Link, useParams} from 'react-router-dom'
import Modules from './Modules'
import Section from '../components/Section'
import {formatResumeData} from '../util/helpers'

const Users = (): JSX.Element => {
  const {userId} = useParams()
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch(
      'https://gist.githubusercontent.com/Stevenlee731/dde8a4a37620642b13e3c6336703a243/raw/0a45f8d430a60b220681e8f8ee232d6d64dee0f5/resume.json',
    )
      .then(res => res.json())
      .then(res => setUser(res))
  }, [])

  if (user) {
    const data = formatResumeData(user)
    return (
      <>
        {data.map((section, index) => {
          return (
            <Section key={section.module}>
              <Modules
                module={section.module}
                data={section.data}
                layout={index % 2 === 0 ? 'primary' : 'secondary'}
              />
            </Section>
          )
        })}
      </>
    )
  } else {
    return <div></div>
  }
}

export default Users
