import React from 'react'
import {StyledWave} from '../styles/Components'
import {GET_VIEWPORT_INFO_QUERY} from '../graphql/Queries'
import {useQuery} from '@apollo/client'
import {ViewportInfoProps} from '../types'

export const Chevron = ({
  direction = 'down',
}: {
  direction: string
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`icon-cheveron-${direction}`}
    >
      {(function (): JSX.Element {
        switch (direction) {
          case 'left':
            return (
              <path
                className="secondary"
                fillRule="evenodd"
                d="M15.3 10.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
              />
            )
          case 'right':
            return (
              <path
                className="secondary"
                fillRule="evenodd"
                d="M15.3 10.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
              />
            )
          case 'up':
            return (
              <path
                className="secondary"
                fillRule="evenodd"
                d="M8.7 13.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 10.42l-3.3 3.3z"
              />
            )
          case 'down':
          default:
            return (
              <path
                className="secondary"
                fillRule="evenodd"
                d="M15.3 10.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
              />
            )
        }
      })()}
    </svg>
  )
}

export const Hamburger = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon-menu"
  >
    <path
      className="secondary"
      fillRule="evenodd"
      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
    />
  </svg>
)

export const ThumbsDown = ({fill}: {fill: string}): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon-thumbs-down"
  >
    <path
      className="primary"
      fill={fill}
      d="M11 19.2l-2.92-6.8A1 1 0 0 1 8 12V4c0-1.1.9-2 2-2h6c1.5 0 3.11 1.06 3.7 2.45l2.22 5.16A1 1 0 0 1 22 10v2a3 3 0 0 1-3 3h-4v4a3 3 0 0 1-3 3 1 1 0 0 1-1-1v-1.8z"
    />
    <rect
      fill={fill}
      width="4"
      height="11"
      x="2"
      y="2"
      className="secondary"
      rx="1"
      transform="rotate(180 4 7.5)"
    />
  </svg>
)

export const Wave = (): JSX.Element => {
  const {data} = useQuery<ViewportInfoProps>(GET_VIEWPORT_INFO_QUERY)
  const {width, currentBreakpoint} = data || {width: 300}

  return (
    <StyledWave
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width > 1440 ? 1440 : width} 320`}
    >
      <path
        fill="#0099ff"
        fillOpacity="1"
        d="M0,192L80,202.7C160,213,320,235,480,202.7C640,171,800,85,960,58.7C1120,32,1280,64,1360,80L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
    </StyledWave>
  )
}
