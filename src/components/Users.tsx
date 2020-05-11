import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import {Routes, Route, Link, useParams} from 'react-router-dom'
import Modules from './Modules'
import {formatResumeData} from '../util/helpers'
import {StyledSection} from '../styles/Section'

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

    const refs = data.reduce<any>((acc, value) => {
      acc[value.module] = React.createRef()
      return acc
    }, {})

    return (
      <>
        <Header modules={data} refs={refs} />
        {data.map((section, index) => {
          return (
            <StyledSection key={section.module} ref={refs[section.module]}>
              <Modules
                module={section.module}
                data={section.data}
                layout={index % 2 === 0 ? 'primary' : 'secondary'}
              />
            </StyledSection>
          )
        })}
      </>
    )
  } else {
    return <div></div>
  }
}

export default Users
