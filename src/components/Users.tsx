import React, {useEffect, useState} from 'react'
import {useQuery, gql} from '@apollo/client'
import Header from '../components/Header'
import {Routes, Route, Link, useParams} from 'react-router-dom'
import Modules from './Modules'
import {formatResumeData} from '../util/helpers'
import {
  StyledMainSection,
  StyledSidebarSection,
  StyledContentWrapper,
} from '../styles/Section'
import Basics from '../modules/Basics'
import {GET_USER} from '../graphql/Queries'

import {
  Sidebar,
  SidebarSection,
  SidebarWrapper,
} from '../components/Sidebar/index'

import Profile from '../modules/Profile'

const Users = ({
  handleTheme,
  isDark,
}: {
  handleTheme: Function
  isDark: boolean
}): JSX.Element => {
  const {userId} = useParams()

  const {loading, error, data} = useQuery(GET_USER, {
    variables: {username: userId},
  })

  if (loading) return <div>...loading</div>
  if (error || (data && data.allUsers.length < 1)) return <div>Error!</div>

  const {allUsers} = data
  const {basics, ...rest} = (allUsers && allUsers[0]) || {}

  const main = []
  const sidebar = []

  for (const property in rest) {
    if (rest[property]) {
      if (rest[property].slot === 'main') {
        main.push(rest[property])
      } else {
        sidebar.push(rest[property])
      }
    }
  }

  const refs =
    main &&
    main.reduce<any>((acc, value) => {
      acc[value.module] = React.createRef()
      return acc
    }, {})

  return (
    <>
      <Header
        handleTheme={handleTheme}
        isDark={isDark}
        modules={main}
        name={basics.name}
        website={basics.website}
        refs={refs}
      />
      {basics && <Basics {...basics} layout="" background={'primary'} />}

      {sidebar && (
        <Sidebar>
          <SidebarWrapper>
            <Profile {...basics} />
          </SidebarWrapper>
          <SidebarWrapper>
            {sidebar.map((section: any) => {
              // console.log(section.module, 'module')
              return (
                <SidebarSection module={section.module} key={section.module}>
                  <Modules
                    module={section.module}
                    data={section.content}
                    slot={section.slot}
                    background={''}
                  />
                </SidebarSection>
              )
            })}
          </SidebarWrapper>
        </Sidebar>
      )}

      {main && (
        <StyledContentWrapper>
          {main.map((section: any, index: any) => {
            return (
              <StyledMainSection
                key={section.module}
                ref={refs[section.module]}
              >
                <Modules
                  module={section.module}
                  data={section.content}
                  slot={section.slot}
                  background={index % 2 === 0 ? 'primary' : 'secondary'}
                />
              </StyledMainSection>
            )
          })}
        </StyledContentWrapper>
      )}
    </>
  )
}

export default Users
