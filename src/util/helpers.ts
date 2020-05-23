import {ModuleList, ModulesProps} from '../types'
import {ApolloClient} from '@apollo/client'

export function formatResumeData(
  modules: ModuleList,
): [Array<ModulesProps>, Array<ModulesProps>] {
  const main = []
  const sidebar = []

  for (const module of Object.values(modules)) {
    if (!module.slot) {
      continue
    }
    if (module.slot === 'main') {
      main.push(module)
    } else {
      sidebar.push(module)
    }
  }

  return [main, sidebar]
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
