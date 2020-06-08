import React, {useEffect} from 'react'
import {GET_VIEWPORT_INFO_QUERY} from '../graphql/Queries'
import {useQuery, useLazyQuery} from '@apollo/client'
import {ViewportInfoProps} from '../types'

export const AddSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon-add"
  >
    <path
      className="secondary"
      fillRule="evenodd"
      d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
    />
  </svg>
)

export const AddItemSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon-widget-add"
  >
    <path
      className="primary"
      d="M5 13h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2zm10 0h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2zM5 3h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2z"
    />
    <path
      className="secondary"
      d="M18 6h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0V8h-2a1 1 0 0 1 0-2h2V4a1 1 0 0 1 2 0v2z"
    />
  </svg>
)

export const CloseSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="icon-close"
    >
      <path
        className="secondary"
        fillRule="evenodd"
        d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
      />
    </svg>
  )
}

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

export const Wave = ({fill}: {fill: string}): JSX.Element => {
  const [getCurrentViewport, {data}] = useLazyQuery<ViewportInfoProps>(
    GET_VIEWPORT_INFO_QUERY,
  )

  let isMounted = true
  useEffect(() => {
    if (isMounted) {
      getCurrentViewport()
    }
    return (): void => {
      isMounted = false
    }
  }, [])

  const {width} = data || {width: 1440}

  if (data) {
    return (
      <div style={{position: 'absolute', bottom: '0', width: '100%'}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${width > 1440 ? 1440 : width} 320`}
        >
          <defs>
            <linearGradient id="myGradient">
              <stop offset="40%" stopColor={fill} />
              <stop offset="100%" stopColor={`${fill}99`} />
            </linearGradient>
          </defs>
          <path
            fill="url('#myGradient')"
            fillOpacity="1"
            d="M0,192L80,202.7C160,213,320,235,480,202.7C640,171,800,85,960,58.7C1120,32,1280,64,1360,80L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    )
  }

  return (
    <div style={{position: 'absolute', bottom: '0', width: '100%'}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width > 1440 ? 1440 : width} 320`}
      >
        <defs>
          <linearGradient id="myGradient">
            <stop offset="40%" stopColor={fill} />
            <stop offset="100%" stopColor={`${fill}99`} />
          </linearGradient>
        </defs>
        <path
          fill="url('#myGradient')"
          fillOpacity="1"
          d="M0,192L80,202.7C160,213,320,235,480,202.7C640,171,800,85,960,58.7C1120,32,1280,64,1360,80L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </div>
  )
}

export const Logo = ({fill}: {fill: string}): JSX.Element => {
  return (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 403 403">
      <path
        fill={fill}
        d="M173 4A206 206 0 0043 80 205 205 0 004 230a205 205 0 0076 131 205 205 0 00150 40 205 205 0 00131-77 205 205 0 0040-150 205 205 0 00-77-131A205 205 0 00173 4zm104 104l1 5c0 5 0 5 3 6 8 1 11 7 10 26 0 19-1 28-14 73-3 15-4 19-3 37 1 3 0 3-4 4l-5 1-1-17 1-16 5-18c9-33 12-49 12-65 0-19-3-20-22-7-11 9-18 16-26 27l-5 7-2-2c-4-6-13-3-13 4 0 3 4 7 7 7 2 0 2 0-2 7-7 17-9 28-9 53v18l-7 2c-9 2-14 1-28-3l-15-3-15 3c-12 3-21 5-26 3l-3-1 5-11c26-65 61-112 97-129 11-6 17-7 30-7 9 0 10 0 15-3 6-3 11-4 14-1zM108 272c13 3 22 3 36-1l15-3 17 4c15 4 20 4 34 0 15-5 18-5 33-1l18 4 17-3 17-4 14 3 14 3h4v23l-5-1-13-4c-12-3-17-3-33 2l-15 3-16-3c-16-5-20-5-34-1s-21 4-35 0l-16-3-17 3c-14 4-21 4-35 0-16-5-17-4-47 5-2 0-2-1-2-11v-12l4-1 15-3c12-4 16-3 30 1z"
      />
      <path
        fill={fill}
        d="M187 175c-16 18-34 51-30 56 1 1 8-5 12-9 10-12 12-16 17-33l4-17-3 3z"
      />
    </svg>
  )
}

export const UserSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon-user"
  >
    <path className="primary" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
    <path
      className="secondary"
      d="M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z"
    />
  </svg>
)
