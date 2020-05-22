import React from 'react'
import {useApolloClient} from '@apollo/client'
import {breakpoints} from '../util/cssHelpers.js'
import useDimensions from 'react-cool-dimensions'
import {GET_VIEWPORT_INFO_QUERY} from '../graphql/Queries'
import StyledPage from '../styles/StyledPage'

const Page = ({children}: {children: React.ReactChild}): JSX.Element => {
  const client = useApolloClient()
  const ref = React.useRef<HTMLDivElement>(null)
  const {currentBreakpoint, width} = useDimensions(ref, {
    breakpoints,
    onResize: ({
      currentBreakpoint,
      width,
    }: {
      currentBreakpoint: string
      width: number
    }) => {
      client.writeQuery({
        query: GET_VIEWPORT_INFO_QUERY,
        data: {currentBreakpoint, width},
      })
    },
  })

  client.writeQuery({
    query: GET_VIEWPORT_INFO_QUERY,
    data: {currentBreakpoint, width},
  })

  return <StyledPage ref={ref}>{children}</StyledPage>
}

export default Page
