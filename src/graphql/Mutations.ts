import {gql} from '@apollo/client'

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      item {
        username
        basics {
          name
        }
      }
      token
    }
  }
`

export const UNAUTHENTICATE_USER_MUTATION = gql`
  mutation UNAUTHENTICATE_USER_MUTATION {
    unauthenticateUser {
      success
    }
  }
`

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(
      data: {username: $username, email: $email, password: $password}
    ) {
      id
    }
  }
`
