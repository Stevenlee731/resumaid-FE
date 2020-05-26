import {useLazyQuery} from '@apollo/client'
import React, {useCallback, useState} from 'react'
import {sendReparentableChild} from 'react-reparenting'
import {CURRENT_USER_QUERY} from '../graphql/Queries'
import StyledLayout from '../styles/StyledLayout'
import {useSafeUnMount} from '../util/hooks'
import Profile from '../modules/Profile'
import Basics from '../modules/Basics'
import {formatResumeData} from '../util/helpers'

import Modules from './Modules'
import {StyledMainSection, StyledContentWrapper} from '../styles/Section'

import {Sidebar, SidebarSection, SidebarWrapper} from './Sidebar/index'

import {ModulesProps, ViewportInfoProps} from '../types'
import {ThumbsDown} from '../assets/svg'
import styled, {ThemeConsumer} from 'styled-components'
import {MainLoader, SidebarLoader, SubheaderLoader} from '../components/Loaders'

export function Child() {
  // // The state is manteined during reparenting.
  // const [state] = useState(() => Math.random().toFixed(10))

  // // Logs the component lificycle.
  // console.log('-- rendering the child')
  // useEffect(() => {
  //   // The component is mounted only one time.
  //   console.log('---- mounting the child')
  //   return () => {
  //     // The component is never unmounted during reparenting.
  //     console.log('------ unmounting the child')
  //   }
  // }, [])

  return <div className="child">Child</div>
}

export default function Create({isDark, handleTheme}) {
  const [parent, setParent] = useState('A')

  const children = {
    parentA: parent === 'A' ? [<Child key={'1'} />] : [],
    parentB: parent === 'B' ? [<Child key={'1'} />] : [],
  }

  const changeParent = useCallback(() => {
    setParent(parent => {
      const newParent = parent === 'A' ? 'B' : 'A'
      // The "send" method will also transfer the child DOM node.
      // (You can disable this feature, and transfer it manually).
      // send(parent, newParent, 0, 0) means that the first child of
      // "parent" will become the first child of "newParent" (0 is the index).
      // Try removing the send method and check what has changed in the console.
      sendReparentableChild(parent, newParent, 0, 0)
      // Return the new parent.
      return newParent
    })
  }, [])

  const [getCurrentUser, {data, loading, error}] = useLazyQuery(
    CURRENT_USER_QUERY,
  )

  useSafeUnMount(getCurrentUser)

  console.log(data)

  if (loading) {
    return <div>Loading</div>
  }

  if (error || !data) {
    return <div>error</div>
  }

  const {authenticatedUser} = data || {}
  const {basics, ...rest} = authenticatedUser || {}

  if (!basics) {
    return <div>start here</div>
  }

  const [main, sidebar] = formatResumeData(rest)
  const config = {}

  return (
    <>
      <div style={{gridArea: 'left'}}>
        {/* <Reparentable id="A">{children.parentA}</Reparentable> */}

        <div>
          <ul>
            <li>Basics</li>
            <li>Education</li>
          </ul>
        </div>
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
      <div style={{gridArea: 'right'}}>
        right{' '}
        <button className="button" onClick={changeParent}>
          Change parent
        </button>
      </div>
    </>
  )
}
