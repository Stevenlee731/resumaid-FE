/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react'
import {useQuery, useMutation, useApolloClient, gql} from '@apollo/client'
import Header from './Header'
import {useParams} from 'react-router-dom'
import Modules from './Modules'
import {formatResumeData} from '../util/helpers'
import {StyledMainSection, StyledContentWrapper} from '../styles/Section'
import Basics from '../modules/Basics'
import {
  GET_USER_QUERY,
  GET_USER_MODULES_QUERY,
  GET_VIEWPORT_INFO_QUERY,
} from '../graphql/Queries'

import {Sidebar, SidebarSection, SidebarWrapper} from './Sidebar/index'

import Profile from '../modules/Profile'
import {ModulesProps, ViewportInfoProps} from '../types'
import StyledLayout from '../styles/StyledLayout'
import {ThumbsDown} from '../assets/svg'
import styled, {ThemeConsumer} from 'styled-components'
import {MainLoader, SidebarLoader, SubheaderLoader} from '../components/Loaders'

const StyledIconContainer = styled.div`
  display: flex;
  height: 4rem;
  width: 4rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({theme}) => theme.secondary};
  margin-bottom: 1rem;

  svg {
    height: 2rem;
    width: 2rem;
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
  const client = useApolloClient()

  const {data: viewportInfo} = useQuery<ViewportInfoProps>(
    GET_VIEWPORT_INFO_QUERY,
  )
  const {width, currentBreakpoint} = viewportInfo || {width: 300}

  const {loading, error, data} = useQuery(GET_USER_QUERY, {
    variables: {username: userId},
  })

  if (loading)
    return (
      <>
        <SubheaderLoader />
        <StyledLayout hasSidebar={true}>
          <MainLoader itemCount={3} />
          {width > 812 && <SidebarLoader />}
        </StyledLayout>
      </>
    )
  if (error || (data && data.allUsers.length < 1))
    return (
      <>
        <StyledLayout hasSidebar={false}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <ThemeConsumer>
              {(theme): JSX.Element => (
                <StyledIconContainer>
                  <ThumbsDown fill={theme.textDark} />
                </StyledIconContainer>
              )}
            </ThemeConsumer>
            Error Loading User
          </div>
        </StyledLayout>
      </>
    )

  const {allUsers} = data
  const {basics, ...rest} = (allUsers && allUsers[0]) || {}

  const [main, sidebar] = formatResumeData(rest)

  client.writeQuery({
    query: GET_USER_MODULES_QUERY,
    data: {main, sidebar, basics},
  })

  return (
    <>
      {basics && <Basics {...basics} layout="" background={'primary'} />}
      <StyledLayout hasSidebar={true}>
        {sidebar && (
          <Sidebar>
            <div>
              <SidebarWrapper>
                <Profile {...basics} />
              </SidebarWrapper>
              <SidebarWrapper>
                {sidebar.map((section: ModulesProps) => {
                  return (
                    <SidebarSection
                      module={section.module}
                      key={section.module}
                    >
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
            </div>
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
      </StyledLayout>
    </>
  )
}

export default Users
