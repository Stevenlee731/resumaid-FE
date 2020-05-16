import React from 'react'

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
