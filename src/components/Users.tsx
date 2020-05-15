import React, {useEffect, useState} from 'react'
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
import StyledSidebar from '../styles/StyledSidebar'
import Profile from '../modules/Profile'
import SidebarSection from './SidebarSection'

const Users = ({
  handleTheme,
  isDark,
}: {
  handleTheme: Function
  isDark: boolean
}): JSX.Element => {
  const {userId} = useParams()
  console.log(userId, 'user')
  const [user, setUser] = useState<{basics: any; modules: Array<any>} | null>(
    null,
  )

  useEffect(() => {
    fetch(
      'https://gist.githubusercontent.com/Stevenlee731/dde8a4a37620642b13e3c6336703a243/raw/3ce6af234c6117ac9e461c854685e76b54bbfaa8/resume.json',
    )
      .then(res => res.json())
      .then(res => setUser(res))
  }, [])

  if (user) {
    const {basics, modules} = user || []

    const {refs, sidebar, main} =
      modules &&
      modules.reduce<any>((acc, value) => {
        if (acc.refs) {
          acc.refs[value.module] = React.createRef()
        } else {
          acc.refs = {}
          acc.refs[value.module] = React.createRef()
        }

        if (value.slot === 'main') {
          if (acc.main) {
            acc.main.push(value)
          } else {
            acc.main = []
            acc.main.push(value)
          }
        }

        if (value.slot === 'sidebar') {
          if (acc.sidebar) {
            acc.sidebar.push(value)
          } else {
            acc.sidebar = []
            acc.sidebar.push(value)
          }
        }

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
        {basics && <Basics data={basics} layout="" background={'primary'} />}

        {sidebar && (
          <StyledSidebar>
            <SidebarSection module={'basics'}>
              <Profile {...basics} />
            </SidebarSection>
            {sidebar.map((section: any) => {
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
          </StyledSidebar>
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
  } else {
    return <div></div>
  }
}

export default Users
