import {ModuleList, ModulesProps} from '../types'
import {ApolloClient} from '@apollo/client'
import sortBy from 'lodash.sortby'

export function formatResumeData(
  modules: ModuleList,
): [Array<ModulesProps>, Array<ModulesProps>] {
  const main: ModulesProps[] = []
  const sidebar: ModulesProps[] = []

  if (!modules) {
    return [main, sidebar]
  }

  for (const module of Object.values(modules)) {
    if (!module || !module.slot) {
      continue
    }
    if (module.slot === 'main') {
      main.push(module)
    } else {
      sidebar.push(module)
    }
  }

  return [sortBy(main, ['order']), sortBy(sidebar, ['order'])]
}

export const unAuthAndClearCache = async (
  apolloClient: ApolloClient<any>,
  unAuthMutation: any,
) => {
  const {data} = await unAuthMutation()
  if (data?.unauthenticateUser?.success) {
    apolloClient.resetStore()
  }
  //trigger modal for unsuccessful logout
}

export async function handleValidate(
  value: string,
  fn: Function,
  variables: {},
): Promise<boolean> {
  const {data, error} = await fn(variables)
  if (error) return false

  return data?.allUsers?.length === 0
}

export const formatDataForGraphQL = (formatted: Array<any>) => {
  return formatted.map((inputData: {}) => {
    let formattedObjForGraphQL: {
      [key: string]: any
    } = {}
    for (let [propertyName, value] of Object.entries<string>(inputData)) {
      if (Array.isArray(value)) {
        formattedObjForGraphQL[propertyName] = {
          create: value,
        }
      } else {
        formattedObjForGraphQL[propertyName] = value
      }
    }
    return formattedObjForGraphQL
  })
}
