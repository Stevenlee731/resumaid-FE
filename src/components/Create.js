import {useLazyQuery, useMutation} from '@apollo/client'
import {Redirect, Link} from 'react-router-dom'
import React, {useCallback, useState} from 'react'
import {sendReparentableChild} from 'react-reparenting'
import {CURRENT_USER_QUERY} from '../graphql/Queries'
import StyledLayout from '../styles/StyledLayout'
import {useSafeUnMount} from '../util/hooks'
import Profile from '../modules/Profile'
import Basics from '../modules/Basics'
import {formatResumeData} from '../util/helpers'
import {useForm, useFieldArray, Controller} from 'react-hook-form'
import Form from './InputForm/Form'
import BasicsInputForm from './InputForm/BasicsInputForm'

import Modules from './Modules'
import {StyledMainSection, StyledContentWrapper} from '../styles/Section'

import {Sidebar, SidebarSection, SidebarWrapper} from './Sidebar/index'

import {ModulesProps, ViewportInfoProps} from '../types'
import {ThumbsDown, Chevron} from '../assets/svg'
import styled, {ThemeConsumer} from 'styled-components'
import {MainLoader, SidebarLoader, SubheaderLoader} from '../components/Loaders'
import {
  StyledCenteredContainer,
  StyledButton,
  StyledForm,
  StyledInput,
} from '../styles/Components'
import {CREATE_BASIC, UPDATE_USER} from '../graphql/Mutations'
import {Burger} from './Burger'
import FormMenu from './InputForm/FormMenu'

const StyledFormMenuList = styled.ul`
  margin-top: 2rem;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding-right: 1rem;
  padding-left: 1rem;
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: 1rem;
  margin-bottom: 0;
`

export default function Create({isDark, handleTheme}) {
  const [open, setOpen] = React.useState(true)
  const node = React.useRef()

  const {register, errors, handleSubmit} = useForm()
  const [getCurrentUser, {data, loading, error}] = useLazyQuery(
    CURRENT_USER_QUERY,
  )

  useSafeUnMount(getCurrentUser)

  const [updateUser, updateUserData] = useMutation(UPDATE_USER)
  if (loading) {
    return <div>Loading</div>
  }

  if (error || !data) {
    return <div>error</div>
  }

  const {authenticatedUser} = data || {}
  const {id} = authenticatedUser || {}

  const onSubmit = async ({name, city, label, website}) => {
    const basic = await updateUser({
      variables: {
        id,
        data: {
          basics: {create: {name, label, website, location: {create: {city}}}},
        },
      },
    })
  }

  if (!authenticatedUser) {
    return (
      <StyledCenteredContainer>
        <div style={{marginBottom: '20%'}}>
          <h2>We need to sign you up first!</h2>
          <div className="button-group">
            <StyledButton inverted={true}>
              <Link to="/signin">Sign in</Link>
            </StyledButton>
            <StyledButton inverted={false}>
              <Link to="/signup">Sign up!</Link>
            </StyledButton>
          </div>
        </div>
      </StyledCenteredContainer>
    )
  }

  const {basics, ...rest} = authenticatedUser || {}

  if (!basics) {
    return (
      <BasicsInputForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      />
    )
  }

  const [main, sidebar] = formatResumeData(rest)

  console.log(main, 'main steve')

  return (
    <>
      <div
        style={{
          gridArea: 'left',
          position: 'sticky',
          top: '4rem',
          height: 'auto',
          maxHeight: 'calc(100vh - 4rem)',
        }}
      >
        <Burger open={open} setOpen={setOpen} />
        <FormMenu open={open} setOpen={setOpen}>
          <StyledFormMenuList>
            <Form
              id={id}
              module="basics"
              initialData={basics ? {module: 'basics', content: [basics]} : {}}
              updateUser={updateUser}
              updateUserData={updateUserData}
              inputObj={{
                name: '',
                label: '',
                image: '',
                summary: '',
                website: '',
                location: {
                  city: '',
                },
                email: 'sdfds',
                profiles: [
                  {
                    username: '',
                    network: '',
                    url: '',
                  },
                ],
              }}
            />
            <Form
              id={id}
              module="education"
              initialData={rest.education || {}}
              updateUser={updateUser}
              updateUserData={updateUserData}
              inputObj={{
                institution: '',
                startDate: '',
                endDate: '',
                area: '',
                studyType: '',
              }}
            />
            <Form
              id={id}
              module="skills"
              initialData={rest.skills || {}}
              updateUser={updateUser}
              updateUserData={updateUserData}
              inputObj={{
                level: '',
                name: '',
                keywords: [{keyword: ''}],
              }}
            />
            <Form
              id={id}
              module="work"
              initialData={rest.work || {}}
              updateUser={updateUser}
              updateUserData={updateUserData}
              inputObj={{
                summary: '',
                website: '',
                company: '',
                pinned: false,
                location: '',
                position: '',
                startDate: '',
                endDate: '',
                highlights: [
                  {
                    highlight: '',
                  },
                ],
              }}
            />
            <Form
              id={id}
              module="references"
              initialData={rest.references || {}}
              updateUser={updateUser}
              updateUserData={updateUserData}
              inputObj={{
                reference: '',
                name: '',
              }}
            />
            <Form
              id={id}
              module="awards"
              initialData={rest.awards || {}}
              updateUser={updateUser}
              updateUserData={updateUserData}
              inputObj={{
                title: '',
                awarder: '',
              }}
            />
            <Form
              id={id}
              module="interests"
              initialData={rest.interests || {}}
              updateUser={updateUser}
              updateUserData={updateUserData}
              inputObj={{
                name: '',
              }}
            />
          </StyledFormMenuList>
        </FormMenu>
      </div>
      <div
        style={{
          gridArea: 'content',
          gridTemplateAreas: `'subheader''content'`,
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        }}
      >
        {/* <Reparentable id="B">{children.parentB}</Reparentable> */}
        {basics && <Basics {...basics} layout="" background={'primary'} />}
        <StyledLayout hasSidebar={true}>
          {sidebar && (
            <Sidebar>
              <div>
                <SidebarWrapper>
                  <Profile {...basics} />
                </SidebarWrapper>
                {sidebar && sidebar.length > 0 && (
                  <SidebarWrapper>
                    {sidebar.map(section => {
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
                )}
              </div>
            </Sidebar>
          )}

          {main && (
            <StyledContentWrapper>
              {main.map((section, index) => {
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
      </div>
    </>
  )
}
