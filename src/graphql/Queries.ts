import {gql} from '@apollo/client'

export const GET_USER_QUERY = gql`
  query GetUser($username: String!) {
    allUsers(where: {username: $username}) {
      basics {
        name
        label
        image
        email
        summary
        website
        profiles {
          username
          network
          url
        }
        location {
          city
          countryCode
        }
      }
      education {
        module
        slot
        order
        content {
          endDate
          startDate
          area
          studyType
          institution
        }
      }
      references {
        module
        slot
        order
        content {
          reference
          name
        }
      }
      skills {
        module
        order
        slot
        content {
          keywords {
            keyword
          }
          level
          name
        }
      }
      awards {
        order
        module
        slot
        content {
          title
          awarder
        }
      }
      work {
        module
        order
        slot
        content {
          summary
          website
          company
          pinned
          location
          position
          startDate
          highlights {
            highlight
          }
        }
      }
      interests {
        slot
        order
        module
        content {
          name
        }
      }
    }
  }
`

export const GET_USER_MODULES_QUERY = gql`
  query GetUserModules {
    main @client
    sidebar @client
    basics @client
  }
`

export const IS_USER_AUTHED = gql`
  query IsUserAuthed {
    isSignedIn @client
    user @client
  }
`

export const GET_VIEWPORT_INFO_QUERY = gql`
  query GetViewportInfo {
    currentBreakpoint @client
    width @client
  }
`

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedUser @client {
      username
      basics {
        name
      }
    }
  }
`
