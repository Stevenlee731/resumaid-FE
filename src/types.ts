//#region Modules

export type ModuleList = {
  basics: ModulesProps
  skills: ModulesProps
  awards: ModulesProps
  education: ModulesProps
  interests: ModulesProps
  references: ModulesProps
  work: ModulesProps
}

export type ModuleComponentList = {
  basics: any
  skills: any
  awards: any
  education: any
  interests: any
  work: any
  references: any
}

export type ModulesProps = {
  module: keyof ModuleComponentList
  content: Array<
    | WorkProps
    | BasicsProps
    | EducationProps
    | SkillsProps
    | AwardsProps
    | ReferencesProps
    | InterestsProps
  >
  background: string
  order: number
  slot: string
}

//#endregion Modules

export type SectionProps = {
  key: string
  children: React.ReactNode
}

//#region Basics
export type Location = {
  city?: string
  countryCode?: string
}

export type Profile = {
  username?: string
  url?: string
  network?: string
}

export type BaseModuleProps = {
  background: string
  layout?: string
  slot?: string
}

export type BasicsProps = {
  name?: string
  label?: string
  image?: string
  summary?: string
  website?: string
  email?: string
  location?: Location
  profiles?: Array<Profile>
}

export interface BasicsModuleProps extends BaseModuleProps {
  name?: string
  label?: string
  image?: string
  summary?: string
  website?: string
  email?: string
  location?: Location
  profiles?: Array<Profile>
}
//#endregion Basics

//#region Education
export type EducationProps = {
  area?: string
  endDate?: string
  institution?: string
  startDate?: string
  studyType?: string
}

export interface EducationModuleProps extends BaseModuleProps {
  content: Array<EducationProps>
}

//#endregion Education

//#region Interests

export type InterestsProps = {
  name?: string
}

export interface InterestsModuleProps extends BaseModuleProps {
  content: Array<InterestsProps>
}
//#endregion Interests

//#region Awards

export type AwardsProps = {
  awarder?: string
  title?: string
}

export interface AwardsModuleProps extends BaseModuleProps {
  content: Array<AwardsProps>
}
//#endregion Awards

//#region References
export type ReferencesProps = {
  name?: string
  reference?: string
}

export interface ReferencesModuleProps extends BaseModuleProps {
  content: Array<ReferencesProps>
}

//#endregion References

//#region Skills
export type SkillsProps = {
  level: string
  name: string
  keywords: Array<{keyword: string}>
}

export interface SkillsModuleProps extends BaseModuleProps {
  content: Array<SkillsProps>
}

//#endregion Skills

//#region Work
export type WorkProps = {
  company?: string
  highlights?: string[]
  location?: string
  pinned?: boolean
  startDate?: string
  endDate?: string
  summary?: string
  website?: string
}

export interface WorkModuleProps extends BaseModuleProps {
  content: Array<WorkProps>
}

//#endregion Work

//#region Style Props

export type StyledPageProps = {
  readonly theme: {}
}

export type StyledLayoutProps = {
  readonly theme: {}
  hasSidebar: boolean
}

export type StyledSectionProps = {
  readonly theme: {}
}

export type StyledBaseModuleProps = {
  readonly theme: {}
  background: string
}

export type SidebarSectionProps = {
  children: React.ReactChild
  module: keyof ModuleComponentList
}

//#endregion Style Props
