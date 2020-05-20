import React from 'react'
import ContentLoader from 'react-content-loader'
import {ThemeConsumer} from 'styled-components'
import {
  StyledMainLoader,
  StyledSidebarLoader,
  StyledSubheaderLoader,
} from '../styles/Section'
import styled from 'styled-components'

export const MainLoader = ({itemCount}: {itemCount: number}): any => {
  return (
    <StyledMainLoader>
      {[...Array(itemCount)].map((item, index) => {
        return (
          <ThemeConsumer key={index}>
            {(theme): JSX.Element => (
              <ContentLoader
                style={{width: '100%', height: 'auto'}}
                backgroundColor={theme.primary + '90'}
                foregroundColor={theme.primary}
                viewBox="0 0 380 110"
              >
                <rect x="0" y="0" rx="5" ry="5" width="150" height="15" />
                <rect x="0" y="20" rx="4" ry="4" width="380" height="85" />
              </ContentLoader>
            )}
          </ThemeConsumer>
        )
      })}
    </StyledMainLoader>
  )
}

export const SidebarLoader = (): JSX.Element => {
  return (
    <StyledSidebarLoader>
      <ThemeConsumer>
        {(theme): JSX.Element => (
          <ContentLoader
            style={{width: '100%', height: 'auto'}}
            backgroundColor={theme.primary + '90'}
            foregroundColor={theme.primary}
            viewBox="0 0 100 200"
          >
            <rect x="0" y="0" rx="5" ry="5" width="100" height="120" />
            <rect x="0" y="130" rx="4" ry="4" width="100" height="50" />
          </ContentLoader>
        )}
      </ThemeConsumer>
    </StyledSidebarLoader>
  )
}

export const SubheaderLoader = (): any => {
  return (
    <StyledSubheaderLoader>
      <ThemeConsumer>
        {(theme): JSX.Element => (
          <ContentLoader
            style={{width: '100%', height: 'auto'}}
            backgroundColor={theme.primary + '90'}
            foregroundColor={theme.primary}
            viewBox="0 0 380 70"
          >
            <rect x="0" y="0" rx="4" ry="4" width="380" height="70" />
          </ContentLoader>
        )}
      </ThemeConsumer>
    </StyledSubheaderLoader>
  )
}
