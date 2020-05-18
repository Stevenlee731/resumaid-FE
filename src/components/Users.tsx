/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react'
import {useQuery, useMutation, useApolloClient, gql} from '@apollo/client'
import Header from './Header'
import {useParams} from 'react-router-dom'
import Modules from './Modules'
import {formatResumeData} from '../util/helpers'
import {StyledMainSection, StyledContentWrapper} from '../styles/Section'
import Basics from '../modules/Basics'
import {GET_USER, GET_USER_MODULES} from '../graphql/Queries'

import {Sidebar, SidebarSection, SidebarWrapper} from './Sidebar/index'

import Profile from '../modules/Profile'
import {ModulesProps} from '../types'

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) @client
  }
`

const GET_TODOS = gql`
  query GetTodos {
    todos @client {
      id
    }
  }
`

const GET_VISIBILITY_FILTER = gql`
  query GetVisibilityFilter {
    visibilityFilter @client
  }
`

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

  const client = useApolloClient()

  if (loading) return <div>...loading</div>
  if (error || (data && data.allUsers.length < 1)) return <div>Error!</div>

  const {allUsers} = data
  const {basics, ...rest} = (allUsers && allUsers[0]) || {}

  const [main, sidebar] = formatResumeData(rest)

  client.writeQuery({
    query: GET_USER_MODULES,
    data: {main, sidebar},
  })

  return (
    <>
      <Header
        handleTheme={handleTheme}
        isDark={isDark}
        name={basics.name}
        website={basics.website}
      />
      {basics && <Basics {...basics} layout="" background={'primary'} />}

      {sidebar && (
        <Sidebar>
          <SidebarWrapper>
            <Profile {...basics} />
          </SidebarWrapper>
          <SidebarWrapper>
            {sidebar.map((section: ModulesProps) => {
              return (
                <SidebarSection module={section.module} key={section.module}>
                  <Modules
                    module={section.module}
                    order={section.order}
                    content={section.content}
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
          {main.map((section: ModulesProps, index: number) => {
            return (
              <StyledMainSection key={section.module}>
                <Modules
                  module={section.module}
                  order={section.order}
                  content={section.content}
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
