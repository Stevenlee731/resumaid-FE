import {ModuleList, ModulesProps} from '../types'

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
